import { Injectable } from '@nestjs/common';
import { GeneratorResponse } from './types';

@Injectable()
export class GeneratorParser {
  parse(ideas: string, tokensUsed: number): GeneratorResponse {
    const cleanJson = this.stripCodeFences(ideas);
    const sixHatsJson = JSON.parse(cleanJson) as GeneratorResponse['data'];

    return {
      type: 'generator',
      data: sixHatsJson,
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
