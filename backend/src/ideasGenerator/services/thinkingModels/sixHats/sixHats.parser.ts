import { Injectable } from '@nestjs/common';
import { SixHatsResponse } from './types';

@Injectable()
export class SixHatsParser {
  parse(ideas: string): SixHatsResponse {
    const sixHatsJson = JSON.parse(ideas) as SixHatsResponse;

    return sixHatsJson;
  }
}
