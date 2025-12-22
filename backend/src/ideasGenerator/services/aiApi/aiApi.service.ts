import { Injectable } from '@nestjs/common';
import { IAiApi } from './types';
import { ConfigService } from '@nestjs/config';
import { YandexGptService } from './yandex/yandexGptLiteApi';

@Injectable()
export class AiApi implements IAiApi {
  private readonly aiProvider: IAiApi;

  constructor(configService: ConfigService) {
    this.aiProvider = new YandexGptService(configService);
  }

  async execPrompt(prompt: string, history: string[]) {
    return this.aiProvider.execPrompt(prompt, history);
  }
}
