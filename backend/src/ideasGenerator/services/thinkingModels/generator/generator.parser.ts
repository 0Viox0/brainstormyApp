import { Injectable } from '@nestjs/common';
import { GeneratorResponse } from './types';

@Injectable()
export class GeneratorParser {
  parse(ideas: string, tokensUsed: number): GeneratorResponse {
    const cleanJson = this.stripCodeFences(ideas);
    const sixHatsJson = JSON.parse(cleanJson) as GeneratorResponse['data'];

    const generatorKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for (const key of generatorKeys) {
      if (!(key in generatorKeys)) {
        throw new Error(`Missing key '${key}' in Generator response`);
      }
    }

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
