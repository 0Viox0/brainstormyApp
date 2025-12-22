class TokenCounter {
  private totalTokensSpent: number;
  private listeners: (() => void)[] = [];

  constructor() {
    this.totalTokensSpent = 0;
  }

  addTokens(tokens: number) {
    this.totalTokensSpent += tokens;
    this.listeners.forEach((cb) => cb());
  }

  getTokens() {
    return this.totalTokensSpent;
  }

  subscribe(callback: () => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(
        (listener) => listener !== callback,
      );
    };
  }
}

export const tokenCounter = new TokenCounter();
