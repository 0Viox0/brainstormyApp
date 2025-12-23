import { Injectable } from '@nestjs/common';
import { AiApi } from '../../aiApi/aiApi.service';
import { GeneratorParser } from './generator.parser';
import { GeneratorResponse } from './types';

@Injectable()
export class GeneratorService {
  constructor(
    private readonly aiApi: AiApi,
    private readonly sixHatsParser: GeneratorParser,
  ) {}

  async getGeneratedIdeas(
    baseIdea: string,
    prompt: string,
    history: string[],
  ): Promise<GeneratorResponse> {
    const promptToExecute = `Сделай мозговой штурм и просто сгенерируй 9 идей на основе этой: ${baseIdea} ${prompt ? `+ ${prompt}` : ''}. Представь результат в формате JSON, где ключ — это номер идеи, а значение — идея на русском. ВЕРНИ В ФОРМАТЕ JSON.`;

    const [ideas, tokensUsed] = await this.aiApi.execPrompt(
      promptToExecute,
      history,
      370,
    );

    return this.sixHatsParser.parse(ideas, tokensUsed);
  }
}
