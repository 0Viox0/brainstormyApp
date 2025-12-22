import type { Method } from '../store/state';
import type { LayerDataResponse } from './types';

export const fetchIdeas = async (
  method: Method,
  baseIdea: string,
  helpingPrompt: string,
  history: string[],
): Promise<LayerDataResponse> => {
  console.log('context sent: ', [...new Set(history)]);
  const response = await fetch(
    `http://localhost:3000/ideas/${method}?baseIdea=${baseIdea}&prompt=${helpingPrompt}&history=${JSON.stringify([...new Set(history)])}`,
  );

  const data = await response.json();

  return data;
};
