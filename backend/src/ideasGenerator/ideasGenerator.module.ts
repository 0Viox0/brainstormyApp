import { Module } from '@nestjs/common';
import { IdeasGeneratorController } from './controllers/ideasGenerator.controller';
import { SixHatsService } from './services/sixHats/sixHats.service';
import { AiApi } from './services/aiApi/aiApi.service';
import { SixHatsParser } from './services/thinkingModels/sixHats/sixHats.parser';

@Module({
  controllers: [IdeasGeneratorController],
  providers: [SixHatsService, AiApi, SixHatsParser],
})
export class IdeasGeneratorModule {}
