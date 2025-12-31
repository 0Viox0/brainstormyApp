import { Injectable } from '@nestjs/common';
import { AiApi } from '../../aiApi/aiApi.service';
import { GeneratorParser } from './generator.parser';
import { GeneratorResponse } from './types';
import { ConfigService } from '@nestjs/config';
import { Retrier } from '../../retrier/retrier';

@Injectable()
export class GeneratorService {
  constructor(
    private readonly aiApi: AiApi,
    private readonly sixHatsParser: GeneratorParser,
    private readonly configService: ConfigService,
    private readonly retrier: Retrier,
  ) {}

  async getGeneratedIdeas(
    baseIdea: string,
    prompt: string,
    history: string[],
  ): Promise<GeneratorResponse> {
    const environment = this.configService.get<string>('ENVIRONMENT');

    if (environment === 'dev') return this.getDummyGeneratorResponse();

    return await this.retrier.retryTillNoExceptionsAsync(async () => {
      const promptToExecute = `Сделай мозговой штурм и просто сгенерируй 9 идей на основе этой: ${baseIdea} ${prompt ? `+ ${prompt}` : ''}. Представь результат в формате JSON, где ключ — это номер идеи, а значение — идея на русском, генерируй значения максимум 20 слов. ВЕРНИ В ФОРМАТЕ JSON.`;

      const [ideas, tokensUsed] = await this.aiApi.execPrompt(
        promptToExecute,
        history,
        370,
      );

      return this.sixHatsParser.parse(ideas, tokensUsed);
    });
  }

  private async getDummyGeneratorResponse() {
    const dummyReponse: GeneratorResponse = {
      type: 'generator',
      data: {
        1: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        2: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        3: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        4: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        5: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        6: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        7: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        8: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        9: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
      },
      tokensUsed: 160,
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return dummyReponse;
  }
}
