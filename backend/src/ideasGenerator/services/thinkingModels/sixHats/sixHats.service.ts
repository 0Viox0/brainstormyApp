import { Injectable } from '@nestjs/common';
import { SixHatsResponse } from './types';
import { AiApi } from '../../aiApi/aiApi.service';
import { SixHatsParser } from './sixHats.parser';

@Injectable()
export class SixHatsService {
  constructor(
    private readonly aiApi: AiApi,
    private readonly sixHatsParser: SixHatsParser,
  ) {}

  async getSixHats(baseIdea: string): Promise<SixHatsResponse> {
    const prompt = `Use six hats brainstorming model to generate ideas from this one: ${baseIdea}. Present the result in JSON format where key is the hat color in lowercase and value is the idea.`;

    const ideas = await this.aiApi.execPrompt(prompt);

    return this.sixHatsParser.parse(ideas);
  }
}
