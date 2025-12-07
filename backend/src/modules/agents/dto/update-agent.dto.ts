import { PartialType } from '@nestjs/swagger';
import { CreateAgentDto } from './create-agent.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { AgentStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAgentDto extends PartialType(CreateAgentDto) {
  @ApiProperty({ enum: AgentStatus, required: false })
  @IsOptional()
  @IsEnum(AgentStatus)
  status?: AgentStatus;
}
