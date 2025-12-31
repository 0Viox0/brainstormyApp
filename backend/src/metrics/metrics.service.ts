import { Injectable, OnModuleInit } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class MetricsService implements OnModuleInit {
  readonly registry: client.Registry;

  readonly yandexGptLiteResponse: client.Counter<string>;
  readonly yandexGptLiteRetries: client.Counter<string>;
  readonly totalAuthRegisteredUsers: client.Counter<string>;
  readonly methodUses: client.Counter<string>;
  readonly tokensSpent: client.Counter<string>;

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

    this.methodUses = new client.Counter({
      name: 'brainstormy_method_uses_total',
      help: 'Total method uses',
      labelNames: ['method'] as const,
      registers: [this.registry],
    });

    this.tokensSpent = new client.Counter({
      name: 'brainstormy_tokens_spent_total',
      help: 'Total tokens spent',
      labelNames: ['kind'] as const,
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
