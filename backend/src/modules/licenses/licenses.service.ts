import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { LicenseType, LicenseStatus } from '@prisma/client';
import { randomBytes } from 'crypto';

@Injectable()
export class LicensesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, agentId: string, type: LicenseType) {
    // Verify agent ownership
    const agent = await this.prisma.agent.findFirst({
      where: { id: agentId, userId },
    });

    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    // Generate license key
    const licenseKey = this.generateLicenseKey();

    // Calculate expiration
    let expiresAt = null;
    let maxExecutions = null;

    switch (type) {
      case 'TRIAL':
        expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
        maxExecutions = 100;
        break;
      case 'MONTHLY':
        expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        maxExecutions = 10000;
        break;
      case 'YEARLY':
        expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
        maxExecutions = 120000;
        break;
      case 'LIFETIME':
        maxExecutions = -1; // Unlimited
        break;
      case 'WHITE_LABEL':
        maxExecutions = -1;
        break;
    }

    const license = await this.prisma.license.create({
      data: {
        key: licenseKey,
        agentId,
        userId,
        type,
        expiresAt,
        maxExecutions,
        status: LicenseStatus.ACTIVE,
      },
    });

    return license;
  }

  async findAll(userId: string) {
    return this.prisma.license.findMany({
      where: { userId },
      include: {
        agent: {
          select: {
            id: true,
            name: true,
            specialty: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async validate(licenseKey: string) {
    const license = await this.prisma.license.findUnique({
      where: { key: licenseKey },
      include: {
        agent: true,
      },
    });

    if (!license) {
      return { valid: false, reason: 'License not found' };
    }

    if (license.status !== LicenseStatus.ACTIVE) {
      return { valid: false, reason: 'License is not active' };
    }

    if (license.expiresAt && license.expiresAt < new Date()) {
      await this.prisma.license.update({
        where: { key: licenseKey },
        data: { status: LicenseStatus.EXPIRED },
      });
      return { valid: false, reason: 'License expired' };
    }

    if (
      license.maxExecutions !== -1 &&
      license.usedExecutions >= license.maxExecutions
    ) {
      return { valid: false, reason: 'Execution limit reached' };
    }

    return { valid: true, license };
  }

  async incrementUsage(licenseKey: string) {
    return this.prisma.license.update({
      where: { key: licenseKey },
      data: {
        usedExecutions: { increment: 1 },
      },
    });
  }

  async revoke(id: string, userId: string) {
    const license = await this.prisma.license.findFirst({
      where: { id, userId },
    });

    if (!license) {
      throw new NotFoundException('License not found');
    }

    return this.prisma.license.update({
      where: { id },
      data: { status: LicenseStatus.REVOKED },
    });
  }

  private generateLicenseKey(): string {
    const segments = [];
    for (let i = 0; i < 4; i++) {
      const segment = randomBytes(4)
        .toString('hex')
        .toUpperCase()
        .substring(0, 4);
      segments.push(segment);
    }
    return segments.join('-');
  }
}
