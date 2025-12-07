import { IsOptional, IsEnum, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AgentStatus, AgentSpecialty } from '@prisma/client';

export class ListAgentsQueryDto {
  @ApiProperty({ enum: AgentStatus, required: false })
  @IsOptional()
  @IsEnum(AgentStatus)
  status?: AgentStatus;

  @ApiProperty({ enum: AgentSpecialty, required: false })
  @IsOptional()
  @IsEnum(AgentSpecialty)
  specialty?: AgentSpecialty;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ default: 1, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiProperty({ default: 10, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}
