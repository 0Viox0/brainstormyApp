import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { SixHatsService } from './services/thinkingModels/sixHats/sixHats.service';
import { ScamperService } from './services/thinkingModels/scamper/scamper.service';
import { GeneratorService } from './services/thinkingModels/generator/generator.service';
import { UserService } from 'src/user/user.service';
import type { RequestWithUser } from 'src/user/types/RequestWithUser';
import { JwtGuard } from 'src/auth/guards/JwtToken.guard';
import { HistoryParser } from './services/historyParser/historyParser';

@Controller('/api/ideas')
export class IdeasGeneratorController {
  constructor(
    private readonly sixHatsService: SixHatsService,
    private readonly scamperService: ScamperService,
    private readonly generatorService: GeneratorService,
    private readonly userService: UserService,
    private readonly historyParser: HistoryParser,
  ) {}

  @Get('sixHats')
  @UseGuards(JwtGuard)
  async getSixHatsIdeas(
    @Query('baseIdea') baseIdea: string,
    @Query('prompt') prompt: string,
    @Query('history') historyRaw: string,
    @Req() req: RequestWithUser,
  ) {
    const history = this.historyParser.parseHistoryString(historyRaw);

    const sixHatsGenerationResult = await this.sixHatsService.getSixHats(
      baseIdea,
      prompt,
      history,
    );

    await this.userService.substractTokens(
      req.user.id,
      sixHatsGenerationResult.tokensUsed,
    );

    return sixHatsGenerationResult;
  }

  @Get('scamper')
  @UseGuards(JwtGuard)
  async getScamperIdeas(
    @Query('baseIdea') baseIdea: string,
    @Query('prompt') prompt: string,
    @Query('history') historyRaw: string,
    @Req() req: RequestWithUser,
  ) {
    const history = this.historyParser.parseHistoryString(historyRaw);

    const scamperGenerationResult = await this.scamperService.getScamper(
      baseIdea,
      prompt,
      history,
    );

    await this.userService.substractTokens(
      req.user.id,
      scamperGenerationResult.tokensUsed,
    );

    return scamperGenerationResult;
  }

  @Get('generator')
  @UseGuards(JwtGuard)
  async getGeneratorIdeas(
    @Query('baseIdea') baseIdea: string,
    @Query('prompt') prompt: string,
    @Query('history') historyRaw: string,
    @Req() req: RequestWithUser,
  ) {
    const history = this.historyParser.parseHistoryString(historyRaw);

    const generatorGenerationResult =
      await this.generatorService.getGeneratedIdeas(baseIdea, prompt, history);

    await this.userService.substractTokens(
      req.user.id,
      generatorGenerationResult.tokensUsed,
    );

    return generatorGenerationResult;
  }
}
