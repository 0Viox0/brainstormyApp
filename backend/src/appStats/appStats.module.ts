import { Module } from '@nestjs/common';
import { AppStatsService } from './appStats.service';
import { MetricsModule } from 'src/metrics/metrics.module';

@Module({
  imports: [MetricsModule],
  controllers: [],
  providers: [AppStatsService],
})
export class AppStatsModule {}
