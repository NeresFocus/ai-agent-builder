import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { IntegrationType } from '@prisma/client';

@Injectable()
export class IntegrationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, agentId: string, data: any) {
    // Verify agent ownership
    const agent = await this.prisma.agent.findFirst({
      where: { id: agentId, userId },
    });

    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    return this.prisma.integration.create({
      data: {
        agentId,
        type: data.type,
        name: data.name,
        config: data.config,
      },
    });
  }

  async findAll(userId: string, agentId: string) {
    const agent = await this.prisma.agent.findFirst({
      where: { id: agentId, userId },
    });

    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    return this.prisma.integration.findMany({
      where: { agentId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, userId: string, data: any) {
    const integration = await this.prisma.integration.findUnique({
      where: { id },
      include: { agent: true },
    });

    if (!integration || integration.agent.userId !== userId) {
      throw new NotFoundException('Integration not found');
    }

    return this.prisma.integration.update({
      where: { id },
      data,
    });
  }

  async delete(id: string, userId: string) {
    const integration = await this.prisma.integration.findUnique({
      where: { id },
      include: { agent: true },
    });

    if (!integration || integration.agent.userId !== userId) {
      throw new NotFoundException('Integration not found');
    }

    return this.prisma.integration.delete({
      where: { id },
    });
  }

  async test(id: string, userId: string) {
    const integration = await this.prisma.integration.findUnique({
      where: { id },
      include: { agent: true },
    });

    if (!integration || integration.agent.userId !== userId) {
      throw new NotFoundException('Integration not found');
    }

    // Test integration based on type
    switch (integration.type) {
      case IntegrationType.WEBHOOK:
        return this.testWebhook(integration.config);
      case IntegrationType.ZAPIER:
        return { success: true, message: 'Zapier integration configured' };
      case IntegrationType.N8N:
        return { success: true, message: 'n8n integration configured' };
      default:
        return { success: true, message: 'Integration test passed' };
    }
  }

  private async testWebhook(config: any) {
    try {
      const response = await fetch(config.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
        },
        body: JSON.stringify({ test: true, timestamp: new Date() }),
      });

      return {
        success: response.ok,
        status: response.status,
        message: response.ok ? 'Webhook test successful' : 'Webhook test failed',
      };
    } catch (error) {
      return {
        success: false,
        message: `Webhook test failed: ${error.message}`,
      };
    }
  }
}
