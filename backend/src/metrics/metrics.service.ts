import { Injectable, OnModuleInit } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class MetricsService implements OnModuleInit {
  readonly registry: client.Registry;

  readonly yandexGptLiteResponse: client.Counter<string>;

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
  }

  onModuleInit() {
    // Optional: set registry type (Prometheus is default)
    // this.registry.setContentType(client.Registry.OPENMETRICS_CONTENT_TYPE);
  }

  async getMetrics(): Promise<string> {
    return this.registry.metrics();
  }

  getContentType(): string {
    return this.registry.contentType;
  }
}
