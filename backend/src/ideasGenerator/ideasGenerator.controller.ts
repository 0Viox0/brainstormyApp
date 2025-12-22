import { Controller, Get, Query } from '@nestjs/common';
import { SixHatsService } from './services/thinkingModels/sixHats/sixHats.service';
import { SixHatsResponse } from './services/thinkingModels/sixHats/types';
import { ScamperResponse } from './services/thinkingModels/scamper/types';
import { ScamperService } from './services/thinkingModels/scamper/scamper.service';

@Controller('ideas')
export class IdeasGeneratorController {
  constructor(
    private readonly sixHatsService: SixHatsService,
    private readonly scamperService: ScamperService,
  ) {}

  @Get('sixHats')
  async getSixHatsIdeas(
    @Query('baseIdea') baseIdea: string,
    @Query('prompt') prompt: string,
  ) {
    // return this.getDummySixHatsResponse();
    return this.sixHatsService.getSixHats(baseIdea);
  }

  @Get('scamper')
  async getScamperIdeas(
    @Query('baseIdea') baseIdea: string,
    @Query('prompt') prompt: string,
  ) {
    // return this.getDummyScamperResponse();
    return this.scamperService.getSixHats(baseIdea);
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
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return dummyReponse;
  }
}
