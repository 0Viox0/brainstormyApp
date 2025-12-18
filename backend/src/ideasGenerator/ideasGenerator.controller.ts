import { Controller, Get, Query } from '@nestjs/common';
import { SixHatsService } from './services/thinkingModels/sixHats/sixHats.service';
import { SixHatsResponse } from './services/thinkingModels/sixHats/types';

@Controller('ideas')
export class IdeasGeneratorController {
  constructor(private readonly sixHatsService: SixHatsService) {}

  @Get('sixHats')
  async getSixHatsIdeas(
    @Query('baseIdea') baseIdea: string,
    @Query('prompt') prompt: string,
  ) {
    // return this.sixHatsService.getSixHats(baseIdea);
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

    // return this.sixHatsService.getSixHats(baseIdea);
  }
}
