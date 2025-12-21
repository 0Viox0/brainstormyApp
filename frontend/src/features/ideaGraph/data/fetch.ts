import type { Method } from '../store/state';
import type { LayerDataResponse } from './types';

export const fetchIdeas = async (
  method: Method,
  baseIdea: string,
  helpingPrompt: string,
): Promise<LayerDataResponse> => {
  const response = await fetch(
    `http://localhost:3000/ideas/${method}?baseIdea=${baseIdea}&prompt=${helpingPrompt}`,
  );

  const data = await response.json();

  return data;
};
