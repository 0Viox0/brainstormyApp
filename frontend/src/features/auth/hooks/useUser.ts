import { useAppStore } from '@/shared/storage/store';
import { fetchUserInfo } from '../fetch';
import { hasJwtToken, isTokenExpired, removeJwtToken } from '../jwtToken';
import { useEffect } from 'react';

export const useUser = () => {
  const setUser = useAppStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchUserInfo();
      if (!user) return;
      setUser(user);
    };

    if (hasJwtToken()) {
      if (isTokenExpired()) {
        removeJwtToken();
        setUser(null);
        return;
      }

      fetchUser();
      return;
    }
  }, [setUser]);
};
