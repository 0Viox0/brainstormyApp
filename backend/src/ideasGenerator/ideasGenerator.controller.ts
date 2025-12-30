import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { SixHatsService } from './services/thinkingModels/sixHats/sixHats.service';
import { ScamperService } from './services/thinkingModels/scamper/scamper.service';
import { GeneratorService } from './services/thinkingModels/generator/generator.service';
import { UserService } from 'src/user/user.service';
import type { RequestWithUser } from 'src/user/types/RequestWithUser';
import { JwtGuard } from 'src/auth/guards/JwtToken.guard';
import { HistoryParser } from './services/historyParser/historyParser';
import { AppStatsService } from 'src/appStats/appStats.service';

@Controller('/api/ideas')
export class IdeasGeneratorController {
  constructor(
    private readonly sixHatsService: SixHatsService,
    private readonly scamperService: ScamperService,
    private readonly generatorService: GeneratorService,
    private readonly userService: UserService,
    private readonly historyParser: HistoryParser,
    private readonly appStatsService: AppStatsService,
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

    await this.appStatsService.incSixHatsUses();

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

    await this.appStatsService.incScamperUses();

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

    await this.appStatsService.incGeneratorUses();

    return generatorGenerationResult;
  }
}
