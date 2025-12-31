import { Injectable, OnModuleInit } from '@nestjs/common';
import { MetricsService } from 'src/metrics/metrics.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppStatsService implements OnModuleInit {
  private readonly STATS_ID = 1;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly metricsService: MetricsService,
  ) {}

  public async onModuleInit() {
    await this.ensureStatsRowExists();
    await this.syncMetricsWithDb();
  }

  public async incTotalYandexRegisteredUsers(): Promise<void> {
    await this.prismaService.appStats.update({
      where: { id: this.STATS_ID },
      data: { totalYandexRegisteredUsers: { increment: 1 } },
    });

    this.metricsService.totalAuthRegisteredUsers.inc({ provider: 'yandex' });
  }

  public async incTotalGoogleRegisteredUsers(): Promise<void> {
    await this.prismaService.appStats.update({
      where: { id: this.STATS_ID },
      data: { totalGoogleRegisteredUsers: { increment: 1 } },
    });

    this.metricsService.totalAuthRegisteredUsers.inc({ provider: 'google' });
  }

  public async incGeneratorUses(): Promise<void> {
    await this.prismaService.appStats.update({
      where: { id: this.STATS_ID },
      data: { generatorUses: { increment: 1 } },
    });

    this.metricsService.methodUses.inc({ method: 'generator' });
  }

  public async incScamperUses(): Promise<void> {
    await this.prismaService.appStats.update({
      where: { id: this.STATS_ID },
      data: { scamperUses: { increment: 1 } },
    });

    this.metricsService.methodUses.inc({ method: 'scamper' });
  }

  public async incSixHatsUses(): Promise<void> {
    await this.prismaService.appStats.update({
      where: { id: this.STATS_ID },
      data: { sixHatsUses: { increment: 1 } },
    });

    this.metricsService.methodUses.inc({ method: 'sixHats' });
  }

  public async getStats() {
    return this.prismaService.appStats.findUnique({
      where: { id: this.STATS_ID },
    });
  }

  private async syncMetricsWithDb() {
    const stats = await this.getStats();
    if (!stats) return;

    this.metricsService.totalAuthRegisteredUsers.inc(
      { provider: 'yandex' },
      stats.totalYandexRegisteredUsers,
    );
    this.metricsService.totalAuthRegisteredUsers.inc(
      { provider: 'google' },
      stats.totalGoogleRegisteredUsers,
    );
    this.metricsService.methodUses.inc(
      { method: 'generator' },
      stats.generatorUses,
    );
    this.metricsService.methodUses.inc(
      { method: 'scamper' },
      stats.scamperUses,
    );
    this.metricsService.methodUses.inc(
      { method: 'sixHats' },
      stats.sixHatsUses,
    );
  }

  private async ensureStatsRowExists(): Promise<void> {
    await this.prismaService.appStats.upsert({
      where: { id: this.STATS_ID },
      update: {},
      create: {
        id: this.STATS_ID,
        totalYandexRegisteredUsers: 0,
        totalGoogleRegisteredUsers: 0,
        generatorUses: 0,
        scamperUses: 0,
        sixHatsUses: 0,
      },
    });
  }
}
