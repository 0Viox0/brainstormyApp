import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CompletionResponse } from './types';

@Injectable()
export class YandexGptService {
  constructor(private configService: ConfigService) {}

  private readonly logger = new Logger(YandexGptService.name);

  async execPrompt(
    prompt: string,
    history: string[],
    maxTokens?: number,
  ): Promise<[string, number]> {
    const IAM_TOKEN = this.configService.get<string>('IAM_TOKEN');
    const FOLDER_ID = this.configService.get<string>('FOLDER_ID');

    if (!IAM_TOKEN || !FOLDER_ID) {
      throw new HttpException(
        'Environment variables were not loaded',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const url =
      'https://llm.api.cloud.yandex.net/foundationModels/v1/completion';

    const modelConfig = {
      temperature: 0.1,
      maxResponseTokens: maxTokens ?? 250,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${IAM_TOKEN}`,
        'x-folder-id': `${FOLDER_ID}`,
      },
      body: JSON.stringify({
        modelUri: `gpt://${FOLDER_ID}/yandexgpt-lite/latest`,
        completionOptions: {
          stream: false,
          temperature: modelConfig.temperature,
          maxTokens: modelConfig.maxResponseTokens,
          reasoningOptions: { mode: 'DISABLED' },
        },
        messages: [
          {
            role: 'system',
            text: `Используй предоставленный контекст, чтобы сгенерировать идеи: ${history.join(' -> ')}`,
          },
          { role: 'user', text: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new HttpException(text, response.status);
    }

    const data = (await response.json()) as CompletionResponse;

    this.logger.log(data);

    return [
      data.result.alternatives[0].message.text,
      parseInt(data.result.usage.totalTokens),
    ];
  }
}
