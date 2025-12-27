import { TextFieldLoader } from '@/components/atoms';
import { fetchYandexOAuth } from '@/features/auth/fetch';
import { setJwtToken } from '@/features/auth/jwtToken';
import { YandexIcon } from '@/shared/icons';
import { useAppStore } from '@/shared/storage/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const YandexAuth = () => {
  const setUser = useAppStore((state) => state.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    const startOAuth = async (code: string) => {
      const data = await fetchYandexOAuth(code);

      setUser(data.user);
      setJwtToken(data.jwtToken);

      navigate('/');
    };

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (!code) {
      navigate('/');
    }

    startOAuth(code!);
  }, [setUser, navigate]);

  return (
    <div className="flex flex-col items-center pt-[20%]">
      <div className="mb-[10px] flex space-x-3">
        <YandexIcon />
        <span>Аунтефицируем через Yandex</span>
        <YandexIcon />
      </div>
      <TextFieldLoader className="h-[10px] w-[100px]" />
    </div>
  );
};
