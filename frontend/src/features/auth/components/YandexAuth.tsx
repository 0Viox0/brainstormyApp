import { useAppStore } from '@/shared/storage/store';
import { useEffect } from 'react';
import {
  hasJwtToken,
  isTokenExpired,
  removeJwtToken,
  setJwtToken,
} from '../jwtToken';
import { fetchUserInfo, fetchYandexOAuth } from '../fetch';

export const YandexAuth = () => {
  const setUser = useAppStore((state) => state.setUser);

  useEffect(() => {
    const startOAuth = async (code: string) => {
      const data = await fetchYandexOAuth(code);

      setUser(data.user);
      setJwtToken(data.jwtToken);
    };

    const fetchUser = async () => {
      const user = await fetchUserInfo();
      if (!user) return;
      setUser(user);
    };

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (hasJwtToken()) {
      if (isTokenExpired()) {
        removeJwtToken();
        setUser(null);
        return;
      }

      fetchUser();
      return;
    }

    if (code) {
      startOAuth(code);
    }
  }, [setUser]);

  return <></>;
};
