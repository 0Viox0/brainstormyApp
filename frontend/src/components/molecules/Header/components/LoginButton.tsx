import { BorderedDiv, ModalContainer } from '@/components/atoms';
import { YandexIcon } from '@/shared/icons';
import { useState } from 'react';

export const LoginButton = () => {
  const [displayLoginModal, setDisplayLoginModal] = useState(false);

  const handleDisplayLoginModal = () => setDisplayLoginModal(true);
  const handleCloseDisplayLoginModal = () => setDisplayLoginModal(false);

  const handleLogin = () => {
    window.location.href =
      'https://oauth.yandex.ru/authorize?' +
      new URLSearchParams({
        client_id: 'a08c2572b1bb4c9f9d46bd7e10057e1f',
        redirect_uri: import.meta.env.VITE_FRONTEND_URL,
        response_type: 'code',
      });
  };

  return (
    <>
      <BorderedDiv className="cursor-pointer" onClick={handleDisplayLoginModal}>
        Ввойти
      </BorderedDiv>
      {displayLoginModal && (
        <ModalContainer onEscape={handleCloseDisplayLoginModal}>
          <BorderedDiv
            className="flex h-[270px] w-[480px] flex-col items-center
              space-y-[50px]"
          >
            <div
              className="text-brainstormySecondary mt-[10px] w-full text-center
                text-[1.25rem] font-bold"
            >
              Ввойти с помщью
            </div>
            <BorderedDiv
              id="hehe"
              onClick={handleLogin}
              className="flex w-[60%] items-center justify-between
                hover:cursor-pointer"
            >
              <span>Yandex</span>
              <YandexIcon />
            </BorderedDiv>
          </BorderedDiv>
        </ModalContainer>
      )}
    </>
  );
};
