import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Plan } from '@prisma/client';

export class CreateCheckoutSessionDto {
  @ApiProperty({ enum: Plan })
  @IsEnum(Plan)
  plan: Plan;

  @ApiProperty({ enum: ['monthly', 'yearly'] })
  @IsEnum(['monthly', 'yearly'])
  billingPeriod: 'monthly' | 'yearly';
}
