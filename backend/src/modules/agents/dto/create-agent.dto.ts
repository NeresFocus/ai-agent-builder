import { IsString, IsOptional, IsEnum, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AgentSpecialty, ComplexityLevel } from '@prisma/client';

export class CreateAgentDto {
  @ApiProperty({ example: 'Sales Assistant' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Helps with sales inquiries', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: AgentSpecialty })
  @IsEnum(AgentSpecialty)
  specialty: AgentSpecialty;

  @ApiProperty({ enum: ComplexityLevel, default: 'BASIC' })
  @IsOptional()
  @IsEnum(ComplexityLevel)
  complexity?: ComplexityLevel;

  @ApiProperty({ example: 'You are a helpful sales assistant...' })
  @IsString()
  systemPrompt: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  instructions?: any;
}
