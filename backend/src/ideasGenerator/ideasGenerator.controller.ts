import { Controller, Get, Query } from '@nestjs/common';
import { SixHatsService } from './services/thinkingModels/sixHats/sixHats.service';

@Controller('ideas')
export class IdeasGeneratorController {
  constructor(private readonly sixHatsService: SixHatsService) {}

  @Get('sixHats')
  getSixHatsIdeas(
    @Query('baseIdea') baseIdea: string,
    @Query() prompt: string,
  ) {
    return this.sixHatsService.getSixHats(baseIdea);
  }
}
