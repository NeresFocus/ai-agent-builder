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
    // Validate user plan limits
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { agents: { where: { status: { not: AgentStatus.ARCHIVED } } } },
    });

    const agentLimits = {
      FREE: 2,
      BASIC: 10,
      PRO: 50,
      ENTERPRISE: -1,
    };

    if (
      agentLimits[user.plan] !== -1 &&
      user.agents.length >= agentLimits[user.plan]
    ) {
      throw new BadRequestException(
        \`Agent limit reached for \${user.plan} plan. Upgrade to create more agents.\`,
      );
    }

    // Create agent
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
      include: {
        integrations: true,
      },
    });

    return agent;
  }

  async findAll(userId: string, query: ListAgentsQueryDto) {
    const { status, specialty, search, page = 1, limit = 10 } = query;

    const where: any = { userId };

    if (status) {
      where.status = status;
    }

    if (specialty) {
      where.specialty = specialty;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [agents, total] = await Promise.all([
      this.prisma.agent.findMany({
        where,
        include: {
          integrations: true,
          _count: {
            select: { executions: true, licenses: true },
          },
        },
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.agent.count({ where }),
    ]);

    return {
      data: agents,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string, userId: string) {
    const agent = await this.prisma.agent.findFirst({
      where: { id, userId },
      include: {
        integrations: true,
        executions: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        licenses: {
          where: { status: 'ACTIVE' },
        },
      },
    });

    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    return agent;
  }

  async update(id: string, userId: string, dto: UpdateAgentDto) {
    await this.findOne(id, userId);

    return this.prisma.agent.update({
      where: { id },
      data: {
        ...dto,
        version: { increment: 1 },
        updatedAt: new Date(),
      },
      include: {
        integrations: true,
      },
    });
  }

  async delete(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.agent.update({
      where: { id },
      data: { status: AgentStatus.ARCHIVED },
    });
  }

  async execute(id: string, userId: string, input: any) {
    const agent = await this.findOne(id, userId);

    // Check execution limits based on plan
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const executionsToday = await this.prisma.execution.count({
      where: {
        userId,
        createdAt: { gte: today },
      },
    });

    const executionLimits = {
      FREE: 1000,
      BASIC: 10000,
      PRO: 100000,
      ENTERPRISE: -1,
    };

    if (
      executionLimits[user.plan] !== -1 &&
      executionsToday >= executionLimits[user.plan]
    ) {
      throw new BadRequestException(
        'Daily execution limit reached. Upgrade your plan.',
      );
    }

    // Execute with AI service
    const startTime = Date.now();
    let success = true;
    let error = null;
    let output = null;
    let tokens = 0;

    try {
      const result = await this.aiService.executeAgent(agent, input);
      output = result.output;
      tokens = result.tokens;
    } catch (err) {
      success = false;
      error = err.message;
    }

    const duration = Date.now() - startTime;

    // Save execution record
    await this.prisma.execution.create({
      data: {
        agentId: id,
        userId,
        input,
        output: output || {},
        tokens,
        duration,
        success,
        error,
      },
    });

    return {
      success,
      output,
      tokens,
      duration,
      error,
    };
  }

  async clone(id: string, userId: string) {
    const original = await this.findOne(id, userId);

    const cloned = await this.prisma.agent.create({
      data: {
        name: \`\${original.name} (Copy)\`,
        description: original.description,
        specialty: original.specialty,
        complexity: original.complexity,
        systemPrompt: original.systemPrompt,
        instructions: original.instructions,
        userId,
        status: AgentStatus.DRAFT,
      },
    });

    return cloned;
  }

  async getAnalytics(id: string, userId: string) {
    await this.findOne(id, userId);

    const [
      totalExecutions,
      successfulExecutions,
      avgDuration,
      totalTokens,
      recentExecutions,
    ] = await Promise.all([
      this.prisma.execution.count({ where: { agentId: id } }),
      this.prisma.execution.count({ where: { agentId: id, success: true } }),
      this.prisma.execution.aggregate({
        where: { agentId: id },
        _avg: { duration: true },
      }),
      this.prisma.execution.aggregate({
        where: { agentId: id },
        _sum: { tokens: true },
      }),
      this.prisma.execution.findMany({
        where: { agentId: id },
        orderBy: { createdAt: 'desc' },
        take: 7,
        select: {
          createdAt: true,
          success: true,
          duration: true,
          tokens: true,
        },
      }),
    ]);

    return {
      totalExecutions,
      successfulExecutions,
      successRate:
        totalExecutions > 0
          ? (successfulExecutions / totalExecutions) * 100
          : 0,
      avgDuration: avgDuration._avg.duration || 0,
      totalTokens: totalTokens._sum.tokens || 0,
      recentExecutions,
    };
  }
}
