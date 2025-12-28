import { Injectable } from '@nestjs/common';
import { IAiApi } from './types';
import { ConfigService } from '@nestjs/config';
import { YandexGptService } from './yandex/yandexGptLiteApi';
import { MetricsService } from 'src/metrics/metrics.service';

@Injectable()
export class AiApi implements IAiApi {
  private readonly aiProvider: IAiApi;

  constructor(configService: ConfigService, metricsService: MetricsService) {
    this.aiProvider = new YandexGptService(configService, metricsService);
  }

  async execPrompt(prompt: string, history: string[], maxTokens?: number) {
    return this.aiProvider.execPrompt(prompt, history, maxTokens);
  }
}
