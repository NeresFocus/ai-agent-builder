import { IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExecuteAgentDto {
  @ApiProperty({ example: { message: 'Hello, I need help...' } })
  @IsObject()
  input: any;
}
