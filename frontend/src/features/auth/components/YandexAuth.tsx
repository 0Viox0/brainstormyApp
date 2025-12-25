import type { User } from '@/shared/storage/state';
import { useAppStore } from '@/shared/storage/store';
import { useEffect } from 'react';
import { setJwtToken } from '../jwtToken';

type AuthResponse = {
  user: User;
  jwtToken: string;
};

export const YandexAuth = () => {
  const setUser = useAppStore((state) => state.setUser);

  useEffect(() => {
    const getUserFromKey = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (!code) {
        return;
      }

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

      setUser(data.user);
      setJwtToken(data.jwtToken);
    };

    getUserFromKey();
  }, [setUser]);

  return <></>;
};
