import { Injectable } from '@nestjs/common';
import { MetricsService } from 'src/metrics/metrics.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppStatsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly metricsService: MetricsService,
  ) {}

  private readonly STATS_ID = 1;

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

    this.metricsService.generatorUses.inc();
  }

  public async incScamperUses(): Promise<void> {
    await this.prismaService.appStats.update({
      where: { id: this.STATS_ID },
      data: { scamperUses: { increment: 1 } },
    });

    this.metricsService.scamperUses.inc();
  }

  public async incSixHatsUses(): Promise<void> {
    await this.prismaService.appStats.update({
      where: { id: this.STATS_ID },
      data: { sixHatsUses: { increment: 1 } },
    });

    this.metricsService.sixHatsUses.inc();
  }

  public async getStats() {
    return this.prismaService.appStats.findUnique({
      where: { id: this.STATS_ID },
    });
  }
}
