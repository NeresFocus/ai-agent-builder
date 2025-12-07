import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LicenseType } from '@prisma/client';

export class CreateLicenseDto {
  @ApiProperty()
  @IsString()
  agentId: string;

  @ApiProperty({ enum: LicenseType })
  @IsEnum(LicenseType)
  type: LicenseType;
}
