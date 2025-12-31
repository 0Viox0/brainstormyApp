import { Module } from '@nestjs/common';
import { AppStatsService } from './appStats.service';
import { MetricsModule } from 'src/metrics/metrics.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [MetricsModule, PrismaModule],
  controllers: [],
  providers: [AppStatsService],
  exports: [AppStatsService],
})
export class AppStatsModule {}
