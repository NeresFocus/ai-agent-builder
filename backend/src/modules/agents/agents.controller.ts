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
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AgentsService } from './agents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CreateAgentDto,
  UpdateAgentDto,
  ExecuteAgentDto,
  ListAgentsQueryDto,
} from './dto';

@ApiTags('Agents')
@Controller('agents')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  @ApiOperation({ summary: 'List all agents for current user' })
  async findAll(@Request() req, @Query() query: ListAgentsQueryDto) {
    return this.agentsService.findAll(req.user.id, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get agent by ID' })
  async findOne(@Param('id') id: string, @Request() req) {
    return this.agentsService.findOne(id, req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new agent' })
  async create(@Body() createAgentDto: CreateAgentDto, @Request() req) {
    return this.agentsService.create(req.user.id, createAgentDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an agent' })
  async update(
    @Param('id') id: string,
    @Body() updateAgentDto: UpdateAgentDto,
    @Request() req,
  ) {
    return this.agentsService.update(id, req.user.id, updateAgentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an agent' })
  async remove(@Param('id') id: string, @Request() req) {
    return this.agentsService.delete(id, req.user.id);
  }

  @Post(':id/execute')
  @ApiOperation({ summary: 'Execute an agent with input' })
  async execute(
    @Param('id') id: string,
    @Body() executeDto: ExecuteAgentDto,
    @Request() req,
  ) {
    return this.agentsService.execute(id, req.user.id, executeDto.input);
  }

  @Post(':id/clone')
  @ApiOperation({ summary: 'Clone an existing agent' })
  async clone(@Param('id') id: string, @Request() req) {
    return this.agentsService.clone(id, req.user.id);
  }

  @Get(':id/analytics')
  @ApiOperation({ summary: 'Get agent analytics' })
  async getAnalytics(@Param('id') id: string, @Request() req) {
    return this.agentsService.getAnalytics(id, req.user.id);
  }
}
