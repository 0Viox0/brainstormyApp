import { BorderedDiv, ModalContainer } from '@/components/atoms';
import { GoogleIcon, YandexIcon } from '@/shared/icons';
import type { FC } from 'react';

export type LoginModalProps = {
  onExit: () => void;
};

const APPLICATION_URL =
  import.meta.env.VITE_FRONTEND_URL || window.location.origin;

export const LoginModal: FC<LoginModalProps> = ({ onExit }) => {
  const handleYandexLogin = () => {
    window.location.href =
      'https://oauth.yandex.ru/authorize?' +
      new URLSearchParams({
        client_id: import.meta.env.VITE_YANDEX_CLIENT_ID,
        redirect_uri: `${APPLICATION_URL}/auth/yandex`,
        response_type: 'code',
        force_confirm: 'true',
      });
  };

  const handleGoogleLogin = () => {
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: `${APPLICATION_URL}/auth/google`,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'select_account',
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };

  return (
    <ModalContainer onEscape={onExit}>
      <BorderedDiv
        className="flex w-[480px] flex-col items-center space-y-[20px]
          pb-[30px]"
      >
        <div
          className="text-brainstormySecondary mt-[10px] mb-[30px] w-full
            text-center text-[1.25rem] font-bold"
        >
          Ввойти с помщью
        </div>
        <BorderedDiv
          onClick={handleYandexLogin}
          className="flex w-[60%] items-center justify-between
            hover:cursor-pointer"
        >
          <span>Yandex</span>
          <YandexIcon />
        </BorderedDiv>
        <BorderedDiv
          onClick={handleGoogleLogin}
          className="flex w-[60%] items-center justify-between
            hover:cursor-pointer"
        >
          <span>Google</span>
          <GoogleIcon />
        </BorderedDiv>
      </BorderedDiv>
    </ModalContainer>
  );
};
