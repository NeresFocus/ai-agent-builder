import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AgentsModule } from './modules/agents/agents.module';
import { LicensesModule } from './modules/licenses/licenses.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { AiModule } from './modules/ai/ai.module';
import { PrismaModule } from './database/prisma.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([{
      ttl: parseInt(process.env.RATE_LIMIT_TTL || '60', 10),
      limit: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
    }]),
    PrismaModule,
    HealthModule,
    AuthModule,
    UsersModule,
    AgentsModule,
    LicensesModule,
    IntegrationsModule,
    PaymentsModule,
    AiModule,
  ],
})
export class AppModule {}
