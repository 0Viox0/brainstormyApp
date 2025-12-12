export interface IAiApi {
  execPrompt(request: string): Promise<string>;
}
