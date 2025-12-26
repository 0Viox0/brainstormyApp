import { getJwtAuthHeader } from '@/features/auth/jwtToken';
import type { Method } from '../store/state';
import type { LayerDataResponse } from './types';

export const fetchIdeas = async (
  method: Method,
  baseIdea: string,
  helpingPrompt: string,
  history: string[],
): Promise<LayerDataResponse | null> => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/ideas/${method}?baseIdea=${baseIdea}&prompt=${helpingPrompt}&history=${JSON.stringify([...new Set(history)])}`,
    {
      headers: { ...getJwtAuthHeader() },
    },
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data;
};
