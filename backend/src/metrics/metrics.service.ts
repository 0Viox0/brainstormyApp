import { Injectable, OnModuleInit } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class MetricsService implements OnModuleInit {
  readonly registry: client.Registry;

  readonly yandexGptLiteResponse: client.Counter<string>;
  readonly yandexGptLiteRetries: client.Counter<string>;
  readonly totalAuthRegisteredUsers: client.Counter<string>;
  readonly generatorUses: client.Counter<string>;
  readonly scamperUses: client.Counter<string>;
  readonly sixHatsUses: client.Counter<string>;

  constructor() {
    this.registry = new client.Registry();

    this.registry.setDefaultLabels({
      app: 'brainstormy',
    });

    client.collectDefaultMetrics({
      register: this.registry,
    });

    this.yandexGptLiteResponse = new client.Counter({
      name: 'brainstormy_yandex_http_requests_total',
      help: 'Total HTTP requests from yandex gpt lite api',
      labelNames: ['method', 'statusCode'] as const,
      registers: [this.registry],
    });

    this.yandexGptLiteRetries = new client.Counter({
      name: 'brainstormy_yandex_retries_llm',
      help: 'Total retries for yandex gpt lite api',
      labelNames: ['cause'] as const,
      registers: [this.registry],
    });

    this.totalAuthRegisteredUsers = new client.Counter({
      name: 'brainstormy_total_auth_registered_users',
      help: 'Total Yandex registered users',
      labelNames: ['provider'] as const,
      registers: [this.registry],
    });

    this.generatorUses = new client.Counter({
      name: 'brainstormy_generator_uses_total',
      help: 'Total generator uses',
      registers: [this.registry],
    });

    this.scamperUses = new client.Counter({
      name: 'brainstormy_scamper_uses_total',
      help: 'Total scamper uses',
      registers: [this.registry],
    });

    this.sixHatsUses = new client.Counter({
      name: 'brainstormy_six_hats_uses_total',
      help: 'Total six hats uses',
      registers: [this.registry],
    });
  }

  onModuleInit() {}

  async getMetrics(): Promise<string> {
    return this.registry.metrics();
  }

  getContentType(): string {
    return this.registry.contentType;
  }
}
