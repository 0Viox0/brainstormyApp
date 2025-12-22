import { Module } from '@nestjs/common';
import { AiApi } from './services/aiApi/aiApi.service';
import { SixHatsParser } from './services/thinkingModels/sixHats/sixHats.parser';
import { IdeasGeneratorController } from './ideasGenerator.controller';
import { SixHatsService } from './services/thinkingModels/sixHats/sixHats.service';
import { ScamperService } from './services/thinkingModels/scamper/scamper.service';
import { ScamperParser } from './services/thinkingModels/scamper/scamper.parser';

@Module({
  controllers: [IdeasGeneratorController],
  providers: [
    SixHatsService,
    ScamperService,
    AiApi,
    SixHatsParser,
    ScamperParser,
  ],
})
export class IdeasGeneratorModule {}
