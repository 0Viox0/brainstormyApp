import { useAppStore } from '@/shared/storage/store';
import { useEffect } from 'react';
import {
  getJwtToken,
  hasJwtToken,
  removeJwtToken,
  setJwtToken,
} from '../jwtToken';
import { fetchUserInfo, fetchYandexOAuth } from '../fetch';
import { jwtDecode } from 'jwt-decode';

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

    const isTokenExpired = () => {
      const token = getJwtToken();
      if (!token || token === 'undefined') return true;

      const payload = jwtDecode(token);
      if (!payload.exp) return true;

      const currentTime = Date.now() / 1000;

      return payload.exp < currentTime;
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
