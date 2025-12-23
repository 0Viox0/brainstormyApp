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

  async getScamper(
    baseIdea: string,
    prompt: string,
    history: string[],
  ): Promise<ScamperResponse> {
    const promptToExecute = `Используй модель мозгового штурма “SCAMPER”, чтобы сгенерировать идеи на основе этой: ${baseIdea} ${prompt ? `+ ${prompt}` : ''}. Представь результат в формате JSON, где ключ — это буква в нижнем регистре на английском, а значение — идея на русском. ВЕРНИ В ФОРМАТЕ JSON.`;

    const [ideas, tokensUsed] = await this.aiApi.execPrompt(
      promptToExecute,
      history,
    );

    return this.sixHatsParser.parse(ideas, tokensUsed);
  }
}
