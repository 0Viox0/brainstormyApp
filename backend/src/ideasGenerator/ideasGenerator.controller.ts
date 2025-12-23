import { Controller, Get, Query } from '@nestjs/common';
import { SixHatsService } from './services/thinkingModels/sixHats/sixHats.service';
import { SixHatsResponse } from './services/thinkingModels/sixHats/types';
import { ScamperResponse } from './services/thinkingModels/scamper/types';
import { ScamperService } from './services/thinkingModels/scamper/scamper.service';
import { GeneratorResponse } from './services/thinkingModels/generator/types';
import { GeneratorService } from './services/thinkingModels/generator/generator.service';

@Controller('/api/ideas')
export class IdeasGeneratorController {
  constructor(
    private readonly sixHatsService: SixHatsService,
    private readonly scamperService: ScamperService,
    private readonly generatorService: GeneratorService,
  ) {}

  @Get('sixHats')
  async getSixHatsIdeas(
    @Query('baseIdea') baseIdea: string,
    @Query('prompt') prompt: string,
    @Query('history') historyRaw: string,
  ) {
    // return this.getDummySixHatsResponse();

    const history = historyRaw ? (JSON.parse(historyRaw) as string[]) : [];

    return this.sixHatsService.getSixHats(baseIdea, prompt, history);
  }

  @Get('scamper')
  async getScamperIdeas(
    @Query('baseIdea') baseIdea: string,
    @Query('prompt') prompt: string,
    @Query('history') historyRaw: string,
  ) {
    // return this.getDummyScamperResponse();

    const history = historyRaw ? (JSON.parse(historyRaw) as string[]) : [];

    return this.scamperService.getScamper(baseIdea, prompt, history);
  }

  @Get('generator')
  async getGeneratorIdeas(
    @Query('baseIdea') baseIdea: string,
    @Query('prompt') prompt: string,
    @Query('history') historyRaw: string,
  ) {
    // return this.getDummyGeneratorResponse();

    const history = historyRaw ? (JSON.parse(historyRaw) as string[]) : [];

    return this.generatorService.getGeneratedIdeas(baseIdea, prompt, history);
  }

  private async getDummySixHatsResponse() {
    const dummyReponse: SixHatsResponse = {
      type: 'sixHats',
      data: {
        blue: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        white:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        green:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        yellow:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        black:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        red: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
      },
      tokensUsed: 160,
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return dummyReponse;
  }

  private async getDummyScamperResponse() {
    const dummyReponse: ScamperResponse = {
      type: 'scamper',
      data: {
        s: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        c: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        a: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        m: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        p: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        e: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        r: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
      },
      tokensUsed: 160,
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return dummyReponse;
  }

  private async getDummyGeneratorResponse() {
    const dummyReponse: GeneratorResponse = {
      type: 'generator',
      data: {
        1: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        2: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        3: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        4: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        5: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        6: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        7: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        8: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        9: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
      },
      tokensUsed: 160,
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return dummyReponse;
  }
}
