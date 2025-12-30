import { Module } from '@nestjs/common';
import { AppStatsService } from './appStats.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AppStatsService],
})
export class AppStatsModule {}
