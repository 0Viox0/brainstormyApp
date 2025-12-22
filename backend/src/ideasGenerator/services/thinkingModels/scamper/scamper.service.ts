import { Injectable } from '@nestjs/common';
import { AiApi } from '../../aiApi/aiApi.service';
import { ScamperParser } from './scamper.parser';
import { ScamperResponse } from './types';

@Injectable()
export class ScamperService {
  constructor(
    private readonly aiApi: AiApi,
    private readonly sixHatsParser: ScamperParser,
  ) {}

  async getSixHats(baseIdea: string): Promise<ScamperResponse> {
    // const prompt = `Use six hats brainstorming model to generate ideas from this one: ${baseIdea}. Present the result in JSON format where key is the hat color in lowercase and value is the idea. RETURN IN JSON FORMAT`;

    const prompt = `Используй модель мозгового штурма “SCAMPER”, чтобы сгенерировать идеи на основе этой: ${baseIdea}. Представь результат в формате JSON, где ключ — это буква в нижнем регистре на английском, а значение — идея на русском. ВЕРНИ В ФОРМАТЕ JSON.`;

    const ideas = await this.aiApi.execPrompt(prompt);

    return this.sixHatsParser.parse(ideas);
  }
}
