class HistoryManager {
  private history: string[];

  constructor() {
    this.history = [];
  }

  public resetHistory = () => {
    this.history = [];
  };

  public addHistoryItem = (text: string) => {
    this.history.push(text);
  };

  public getHistory = () => {
    this.history = [...new Set(this.history)];
    return this.history;
  };
}

export const historyManger = new HistoryManager();
