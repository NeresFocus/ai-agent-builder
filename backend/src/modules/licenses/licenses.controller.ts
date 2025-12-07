import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LicensesService } from './licenses.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateLicenseDto, ValidateLicenseDto } from './dto';

@ApiTags('Licenses')
@Controller('licenses')
export class LicensesController {
  constructor(private readonly licensesService: LicensesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all licenses for current user' })
  async findAll(@Request() req) {
    return this.licensesService.findAll(req.user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new license' })
  async create(@Body() createLicenseDto: CreateLicenseDto, @Request() req) {
    return this.licensesService.create(
      req.user.id,
      createLicenseDto.agentId,
      createLicenseDto.type,
    );
  }

  @Post('validate')
  @ApiOperation({ summary: 'Validate a license key' })
  async validate(@Body() validateLicenseDto: ValidateLicenseDto) {
    return this.licensesService.validate(validateLicenseDto.licenseKey);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Revoke a license' })
  async revoke(@Param('id') id: string, @Request() req) {
    return this.licensesService.revoke(id, req.user.id);
  }
}
