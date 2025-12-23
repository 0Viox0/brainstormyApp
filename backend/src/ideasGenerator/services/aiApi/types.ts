export interface IAiApi {
  execPrompt(
    request: string,
    history: string[],
    maxTokens?: number,
  ): Promise<[string, number]>;
}
