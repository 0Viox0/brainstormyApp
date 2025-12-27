import { jwtDecode } from 'jwt-decode';
import { getJwtAuthHeader, getJwtToken } from './jwtToken';
import type { AuthResponse } from './types';
import type { User } from '@/shared/storage/state';

export const fetchYandexOAuth = async (code: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/auth/yandex`,

    {
      method: 'POST',
      body: JSON.stringify({ code }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const data = (await response.json()) as AuthResponse;

  return data;
};

export const fetchGoogleOAuth = async (code: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/auth/google`,

    {
      method: 'POST',
      body: JSON.stringify({ code }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const data = (await response.json()) as AuthResponse;

  return data;
};

export const fetchUserInfo = async () => {
  const token = getJwtToken();
  if (!token) return null;

  const payload = jwtDecode(token);

  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/users/${payload.sub}`,
    {
      headers: { ...getJwtAuthHeader() },
    },
  );

  const userData = (await response.json()) as User;

  return userData;
};
