import { TextFieldLoader } from '@/components/atoms';
import { fetchGoogleOAuth } from '@/features/auth/fetch';
import { setJwtToken } from '@/features/auth/jwtToken';
import { GoogleIcon } from '@/shared/icons';
import { useAppStore } from '@/shared/storage/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const GoogleAuth = () => {
  const setUser = useAppStore((state) => state.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    const startOAuth = async (code: string) => {
      const data = await fetchGoogleOAuth(code);

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
        <GoogleIcon />
        <span>Аунтефицируем через Google</span>
        <GoogleIcon />
      </div>
      <TextFieldLoader className="h-[10px] w-[100px]" />
    </div>
  );
};
