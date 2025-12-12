export type Operation = {
  id: string;
  description: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  done: boolean;
  metadata: null;
};

export type CompletionResponse = {
  done: boolean;
  response: {
    '@type': string;
    alternatives: {
      message: { role: string; text: string };
      status: string;
    }[];
    usage: {
      inputTextTokens: string;
      completionTokens: string;
      totalTokens: string;
    };
    modelVersion: string;
  };
  id: string;
  description: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
};
