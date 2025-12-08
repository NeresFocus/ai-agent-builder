import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { AiService } from '../ai/ai.service';
import { CreateAgentDto, UpdateAgentDto, ListAgentsQueryDto } from './dto';
import { AgentStatus, ComplexityLevel } from '@prisma/client';

@Injectable()
export class AgentsService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async create(userId: string, dto: CreateAgentDto) {
    const agent = await this.prisma.agent.create({
      data: {
        name: dto.name,
        description: dto.description,
        specialty: dto.specialty,
        complexity: dto.complexity || ComplexityLevel.BASIC,
        systemPrompt: dto.systemPrompt,
        instructions: dto.instructions || {},
        userId,
        status: AgentStatus.DRAFT,
      },
    });
    return agent;
  }

  async findAll(userId: string, query: ListAgentsQueryDto) {
    const where: any = { userId };
    const [agents, total] = await Promise.all([
      this.prisma.agent.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip: 0,
        take: 10,
      }),
      this.prisma.agent.count({ where }),
    ]);
    return { data: agents, meta: { total, page: 1, limit: 10, totalPages: 1 } };
  }

  async findOne(id: string, userId: string) {
    const agent = await this.prisma.agent.findUnique({
      where: { id },
    });
    if (!agent) throw new NotFoundException('Agent not found');
    if (agent.userId !== userId) throw new BadRequestException('Unauthorized');
    return agent;
  }

  async update(id: string, userId: string, dto: UpdateAgentDto) {
    await this.findOne(id, userId);
    return this.prisma.agent.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.agent.delete({ where: { id } });
  }

  async execute(id: string, userId: string, input: any) {
    await this.findOne(id, userId);
    return {
      executionId: 'exec_' + Date.now(),
      success: true,
      output: 'Mock response',
      tokens: 100,
      duration: 1000,
    };
  }

  async clone(id: string, userId: string) {
    const agent = await this.findOne(id, userId);
    return this.prisma.agent.create({
      data: {
        name: agent.name + ' (Copy)',
        description: agent.description,
        specialty: agent.specialty,
        complexity: agent.complexity,
        systemPrompt: agent.systemPrompt,
        instructions: agent.instructions,
        userId,
        status: AgentStatus.DRAFT,
      },
    });
  }

  async getAnalytics(id: string, userId: string) {
    await this.findOne(id, userId);
    return {
      totalExecutions: 0,
      successRate: 95,
      avgDuration: 1200,
      avgTokens: 150,
    };
  }
}
