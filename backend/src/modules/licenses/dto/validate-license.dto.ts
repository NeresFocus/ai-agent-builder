import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateLicenseDto {
  @ApiProperty({ example: 'ABCD-1234-EFGH-5678' })
  @IsString()
  licenseKey: string;
}
