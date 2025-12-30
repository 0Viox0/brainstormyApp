import { Injectable } from '@nestjs/common';
import { ScamperResponse } from './types';

@Injectable()
export class ScamperParser {
  parse(ideas: string, tokensUsed: number): ScamperResponse {
    const cleanJson = this.stripCodeFences(ideas);
    const scampperJson = JSON.parse(cleanJson) as ScamperResponse['data'];

    const scamperKeys = ['s', 'c', 'a', 'm', 'p', 'e', 'r'];

    for (const key of scamperKeys) {
      if (!(key in scampperJson)) {
        throw new Error(`Missing key '${key}' in Scamper response`);
      }
    }

    return {
      type: 'scamper',
      data: scampperJson,
      tokensUsed,
    };
  }

  private stripCodeFences(text: string): string {
    return text
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();
  }
}
