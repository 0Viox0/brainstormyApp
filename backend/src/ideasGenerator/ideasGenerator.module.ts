import { Module } from '@nestjs/common';
import { AiApi } from './services/aiApi/aiApi.service';
import { SixHatsParser } from './services/thinkingModels/sixHats/sixHats.parser';
import { IdeasGeneratorController } from './ideasGenerator.controller';
import { SixHatsService } from './services/thinkingModels/sixHats/sixHats.service';

@Module({
  controllers: [IdeasGeneratorController],
  providers: [SixHatsService, AiApi, SixHatsParser],
})
export class IdeasGeneratorModule {}
