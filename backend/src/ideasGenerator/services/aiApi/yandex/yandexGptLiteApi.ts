import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CompletionResponse, Operation } from './types';

@Injectable()
export class YandexGptService {
  constructor(private configService: ConfigService) {}

  async execPrompt(prompt: string): Promise<string> {
    const IAM_TOKEN = this.configService.get<string>('IAM_TOKEN');
    const FOLDER_ID = this.configService.get<string>('FOLDER_ID');

    if (!IAM_TOKEN || !FOLDER_ID) {
      throw new HttpException(
        'Environment variables were not loaded',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const url =
      'https://llm.api.cloud.yandex.net/foundationModels/v1/completionAsync';

    const modelConfig = {
      temperature: 0.1,
      maxResponseTokens: 150,
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
        messages: [{ role: 'user', text: prompt }],
      }),
    });

    const operation = (await response.json()) as Operation;

    const result = await this.waitForOperation(operation.id, IAM_TOKEN);

    return result;
  }

  private async waitForOperation(
    operationId: string,
    token: string,
    interval = 2000,
    timeout = 60000,
  ): Promise<string> {
    const start = Date.now();
    const operationUrl = `https://operation.api.cloud.yandex.net/operations/${operationId}`;

    while (true) {
      const res = await fetch(operationUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = (await res.json()) as CompletionResponse;

      if (data.done) {
        return data.response.alternatives[0].message.text;
      }

      if (Date.now() - start > timeout) {
        throw new Error('Yandex GPT operation timeout');
      }

      await new Promise((r) => setTimeout(r, interval));
    }
  }
}
