export interface IAiApi {
  execPrompt(request: string, history: string[]): Promise<[string, number]>;
}
