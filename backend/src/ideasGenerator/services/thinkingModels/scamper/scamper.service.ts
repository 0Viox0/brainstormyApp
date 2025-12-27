import { Injectable } from '@nestjs/common';
import { AiApi } from '../../aiApi/aiApi.service';
import { ScamperParser } from './scamper.parser';
import { ScamperResponse } from './types';
import { ConfigService } from '@nestjs/config';
import { Retrier } from '../../retrier/retrier';

@Injectable()
export class ScamperService {
  constructor(
    private readonly aiApi: AiApi,
    private readonly sixHatsParser: ScamperParser,
    private readonly configService: ConfigService,
    private readonly retrier: Retrier,
  ) {}

  async getScamper(
    baseIdea: string,
    prompt: string,
    history: string[],
  ): Promise<ScamperResponse> {
    const environment = this.configService.get<string>('ENVIRONMENT');

    if (environment === 'dev') return this.getDummyScamperResponse();

    return this.retrier.retryTillNoExceptionsAsync(async () => {
      const promptToExecute = `Используй модель мозгового штурма “SCAMPER”, чтобы сгенерировать идеи на основе этой: ${baseIdea} ${prompt ? `+ ${prompt}` : ''}. Представь результат в формате JSON, где ключ — это буква в нижнем регистре на английском, а значение — идея на русском. ВЕРНИ В ФОРМАТЕ JSON.`;

      const [ideas, tokensUsed] = await this.aiApi.execPrompt(
        promptToExecute,
        history,
      );

      return this.sixHatsParser.parse(ideas, tokensUsed);
    });
  }

  private async getDummyScamperResponse() {
    const dummyReponse: ScamperResponse = {
      type: 'scamper',
      data: {
        s: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        c: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        a: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        m: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        p: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        e: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
        r: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, expedita.',
      },
      tokensUsed: 160,
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return dummyReponse;
  }
}
