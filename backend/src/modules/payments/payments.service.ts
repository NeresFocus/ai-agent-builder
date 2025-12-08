import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../database/prisma.service';
import Stripe from 'stripe';
import { Plan } from '@prisma/client';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-10-16',
    });
  }

  async createCheckoutSession(userId: string, plan: Plan, billingPeriod: 'monthly' | 'yearly') {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    const priceIds = {
      BASIC: {
        monthly: 'price_basic_monthly',
        yearly: 'price_basic_yearly',
      },
      PRO: {
        monthly: 'price_pro_monthly',
        yearly: 'price_pro_yearly',
      },
    };

    const priceId = priceIds[plan]?.[billingPeriod];

    if (!priceId) {
      throw new Error('Invalid plan or billing period');
    }

    const session = await this.stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${this.configService.get('FRONTEND_URL')}/dashboard?payment=success`,
      cancel_url: `${this.configService.get('FRONTEND_URL')}/pricing?payment=cancelled`,
      metadata: {
        userId,
        plan,
      },
    });

    return {
      sessionId: session.id,
      url: session.url,
    };
  }

  async handleWebhook(signature: string, rawBody: Buffer) {
    const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret,
      );
    } catch (err) {
      throw new Error(`Webhook signature verification failed: ${err.message}`);
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      case 'invoice.payment_failed':
        await this.handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;
    }

    return { received: true };
  }

  private async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const { userId, plan } = session.metadata;

    await this.prisma.user.update({
      where: { id: userId },
      data: { plan: plan as Plan },
    });

    console.log(`User ${userId} upgraded to ${plan}`);
  }

  private async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    // Handle subscription updates
    console.log('Subscription updated:', subscription.id);
  }

  private async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    // Downgrade user to free plan
    const customer = subscription.customer as string;

    const user = await this.prisma.user.findFirst({
      where: { email: subscription.metadata?.email },
    });

    if (user) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { plan: Plan.FREE },
      });
    }

    console.log('Subscription cancelled:', subscription.id);
  }

  private async handlePaymentFailed(invoice: Stripe.Invoice) {
    console.log('Payment failed:', invoice.id);
    // Send notification email
  }

  async getPortalLink(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    // Find or create Stripe customer
    const customers = await this.stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    let customerId: string;

    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      const customer = await this.stripe.customers.create({
        email: user.email,
        metadata: { userId },
      });
      customerId = customer.id;
    }

    const session = await this.stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${this.configService.get('FRONTEND_URL')}/dashboard/settings`,
    });

    return { url: session.url };
  }
}
