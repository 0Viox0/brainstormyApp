import { Injectable } from '@nestjs/common';
import { SixHatsResponse } from './types';
import { AiApi } from '../../aiApi/aiApi.service';
import { SixHatsParser } from './sixHats.parser';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SixHatsService {
  constructor(
    private readonly aiApi: AiApi,
    private readonly sixHatsParser: SixHatsParser,
    private readonly configService: ConfigService,
  ) {}

  async getSixHats(
    baseIdea: string,
    prompt: string,
    history: string[],
  ): Promise<SixHatsResponse> {
    const environment = this.configService.get<string>('ENVIRONMENT');

    if (environment === 'dev') return this.getDummySixHatsResponse();

    const promptToExecute = `Используй модель мозгового штурма “Шесть шляп мышления”, чтобы сгенерировать идеи на основе этой: ${baseIdea} ${prompt ? `+ ${prompt}` : ''}. Представь результат в формате JSON, где ключ — это цвет шляпы в нижнем регистре на английском, а значение — идея на русском. ВЕРНИ В ФОРМАТЕ JSON.`;

    const [ideas, tokensUsed] = await this.aiApi.execPrompt(
      promptToExecute,
      history,
    );

    return this.sixHatsParser.parse(ideas, tokensUsed);
  }

  private async getDummySixHatsResponse() {
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
      tokensUsed: 160,
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return dummyReponse;
  }
}
