import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CompletionResponse } from './types';
import { MetricsService } from 'src/metrics/metrics.service';

@Injectable()
export class YandexGptService {
  constructor(
    private configService: ConfigService,
    private metricsService: MetricsService,
  ) {}

  private readonly logger = new Logger(YandexGptService.name);

  async execPrompt(
    prompt: string,
    history: string[],
    maxTokens?: number,
  ): Promise<[string, number]> {
    const environment = this.configService.get<string>('ENVIRONMENT');
    const IAM_TOKEN = this.configService.get<string>('IAM_TOKEN');
    const FOLDER_ID = this.configService.get<string>('FOLDER_ID');
    const API_TOKEN = this.configService.get<string>('API_TOKEN');

    if (!environment) {
      throw new HttpException(
        'Environment variable "ENVIRONMENT" was not set',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!FOLDER_ID) {
      throw new HttpException(
        'Environment variable "FOLDER_ID" was not set',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (environment === 'prod' && !API_TOKEN) {
      throw new HttpException(
        'Environment variable "API_TOKEN" was not set',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (environment === 'dev' && !IAM_TOKEN) {
      throw new HttpException(
        'Environment variable "IAM_TOKEN" was not set',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const url =
      'https://llm.api.cloud.yandex.net/foundationModels/v1/completion';

    const modelConfig = {
      temperature: 0.1,
      maxResponseTokens: maxTokens ?? 250,
    };

    const getHeaders = () => {
      if (environment === 'prod') {
        return {
          'Content-Type': 'application/json',
          Authorization: `Api-Key ${API_TOKEN}`,
          'x-folder-id': `${FOLDER_ID}`,
        };
      }

      return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${IAM_TOKEN}`,
        'x-folder-id': `${FOLDER_ID}`,
      };
    };

    const method = 'POST';
    let statusCode = '500';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          ...getHeaders(),
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

      statusCode = response.status.toString();

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
    } catch (error) {
      if (error instanceof HttpException) {
        statusCode = error.getStatus().toString();
      }
      throw error;
    } finally {
      this.metricsService.yandexGptLiteResponse.inc({
        method,
        statusCode,
      });
    }
  }
}
