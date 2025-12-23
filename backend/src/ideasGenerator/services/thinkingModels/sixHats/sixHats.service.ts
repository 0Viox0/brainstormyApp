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

  async getSixHats(
    baseIdea: string,
    prompt: string,
    history: string[],
  ): Promise<SixHatsResponse> {
    const promptToExecute = `Используй модель мозгового штурма “Шесть шляп мышления”, чтобы сгенерировать идеи на основе этой: ${baseIdea} ${prompt ? `+ ${prompt}` : ''}. Представь результат в формате JSON, где ключ — это цвет шляпы в нижнем регистре на английском, а значение — идея на русском. ВЕРНИ В ФОРМАТЕ JSON.`;

    const [ideas, tokensUsed] = await this.aiApi.execPrompt(
      promptToExecute,
      history,
    );

    return this.sixHatsParser.parse(ideas, tokensUsed);
  }
}
