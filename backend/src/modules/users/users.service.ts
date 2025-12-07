import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        plan: true,
        createdAt: true,
      },
    });
  }

  async updateProfile(id: string, data: any) {
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        plan: true,
      },
    });
  }

  async getStats(userId: string) {
    const [agentsCount, executionsCount, licensesCount] = await Promise.all([
      this.prisma.agent.count({ where: { userId } }),
      this.prisma.execution.count({ where: { userId } }),
      this.prisma.license.count({ where: { userId } }),
    ]);

    return {
      agentsCount,
      executionsCount,
      licensesCount,
    };
  }
}
