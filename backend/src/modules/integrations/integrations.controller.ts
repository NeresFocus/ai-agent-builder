import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { IntegrationsService } from './integrations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Integrations')
@Controller('agents/:agentId/integrations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Get()
  @ApiOperation({ summary: 'List all integrations for an agent' })
  async findAll(@Param('agentId') agentId: string, @Request() req) {
    return this.integrationsService.findAll(req.user.id, agentId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new integration' })
  async create(
    @Param('agentId') agentId: string,
    @Body() body: any,
    @Request() req,
  ) {
    return this.integrationsService.create(req.user.id, agentId, body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an integration' })
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @Request() req,
  ) {
    return this.integrationsService.update(id, req.user.id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an integration' })
  async remove(@Param('id') id: string, @Request() req) {
    return this.integrationsService.delete(id, req.user.id);
  }

  @Post(':id/test')
  @ApiOperation({ summary: 'Test an integration' })
  async test(@Param('id') id: string, @Request() req) {
    return this.integrationsService.test(id, req.user.id);
  }
}
