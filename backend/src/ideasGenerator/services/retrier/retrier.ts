import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpStatusCode } from 'axios';
import { MetricsService } from 'src/metrics/metrics.service';

@Injectable()
export class Retrier {
  private logger = new Logger(Retrier.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly metricsService: MetricsService,
  ) {}

  async retryTillNoExceptionsAsync<T>(action: () => Promise<T>): Promise<T> {
    const maxRetries = this.configService.get<string>('RETRY_COUNT');

    if (!maxRetries) {
      throw new HttpException(
        'variabe RETRY_COUNT is not set',
        HttpStatusCode.InternalServerError,
      );
    }

    let retryNumber = 0;
    while (retryNumber < parseInt(maxRetries)) {
      try {
        return await action();
      } catch (err) {
        retryNumber++;
        this.logger.error(`RETRY NUMBER ${retryNumber} BECAUSE OF `, err);
        this.metricsService.yandexGptLiteRetries.inc({
          cause: (err as Error).name,
        });
      }
    }

    throw new HttpException(
      'Could not get proper response from yandex api',
      HttpStatusCode.InternalServerError,
    );
  }

  retryTillNoExceptions<T>(action: () => T): T {
    const maxRetries = this.configService.get<string>('RETRY_COUNT');

    if (!maxRetries) {
      throw new HttpException(
        'variabe RETRY_COUNT is not set',
        HttpStatusCode.InternalServerError,
      );
    }

    let retryNumber = 0;
    while (retryNumber < parseInt(maxRetries)) {
      try {
        return action();
      } catch (err) {
        retryNumber++;
        this.logger.error(`RETRY NUMBER ${retryNumber} BECAUSE OF `, err);
        this.metricsService.yandexGptLiteRetries.inc({
          cause: (err as Error).name,
        });
      }
    }

    throw new HttpException(
      'Could not get proper response from yandex api',
      HttpStatusCode.InternalServerError,
    );
  }
}
