import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpStatusCode } from 'axios';

@Injectable()
export class HistoryParser {
  constructor(private readonly configService: ConfigService) {}

  parseHistoryString(historyRaw: string) {
    const historyArray = historyRaw ? (JSON.parse(historyRaw) as string[]) : [];

    const maxHistoryLimit = this.configService.get<string>(
      'MAX_HISTORY_CONTEXT',
    );

    if (!maxHistoryLimit) {
      throw new HttpException(
        'variable MAX_HISTORY_CONTEXT is not set',
        HttpStatusCode.InternalServerError,
      );
    }

    return historyArray.slice(-parseInt(maxHistoryLimit));
  }
}
