import { Injectable } from '@nestjs/common';
import { ScamperResponse } from './types';

@Injectable()
export class ScamperParser {
  parse(ideas: string): ScamperResponse {
    const cleanJson = this.stripCodeFences(ideas);
    const sixHatsJson = JSON.parse(cleanJson) as ScamperResponse['data'];

    return {
      type: 'scamper',
      data: sixHatsJson,
    };
  }

  private stripCodeFences(text: string): string {
    return text
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();
  }
}
