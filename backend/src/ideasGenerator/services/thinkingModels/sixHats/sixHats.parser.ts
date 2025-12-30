import { Injectable } from '@nestjs/common';
import { SixHatsResponse } from './types';

@Injectable()
export class SixHatsParser {
  parse(ideas: string, tokensUsed: number): SixHatsResponse {
    const cleanJson = this.stripCodeFences(ideas);
    const sixHatsJson = JSON.parse(cleanJson) as SixHatsResponse['data'];

    const sixHatsKeys = ['blue', 'white', 'green', 'yellow', 'black', 'red'];

    for (const key of sixHatsKeys) {
      if (!(key in sixHatsKeys)) {
        throw new Error(`Missing key '${key}' in SixHats response`);
      }
    }

    return {
      type: 'sixHats',
      data: sixHatsJson,
      tokensUsed: tokensUsed,
    };
  }

  private stripCodeFences(text: string): string {
    return text
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();
  }
}
