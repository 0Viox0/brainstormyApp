import { Module } from '@nestjs/common';
import { AiApi } from './services/aiApi/aiApi.service';
import { SixHatsParser } from './services/thinkingModels/sixHats/sixHats.parser';
import { IdeasGeneratorController } from './ideasGenerator.controller';
import { SixHatsService } from './services/thinkingModels/sixHats/sixHats.service';
import { ScamperService } from './services/thinkingModels/scamper/scamper.service';
import { ScamperParser } from './services/thinkingModels/scamper/scamper.parser';
import { GeneratorService } from './services/thinkingModels/generator/generator.service';
import { GeneratorParser } from './services/thinkingModels/generator/generator.parser';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [IdeasGeneratorController],
  providers: [
    SixHatsService,
    ScamperService,
    GeneratorService,
    AiApi,
    SixHatsParser,
    ScamperParser,
    GeneratorParser,
  ],
})
export class IdeasGeneratorModule {}
