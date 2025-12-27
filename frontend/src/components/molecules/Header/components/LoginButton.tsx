import { useState } from 'react';

import { BorderedDiv } from '@/components/atoms';
import { LoginModal } from '@/features/auth/components';

export const LoginButton = () => {
  const [displayLoginModal, setDisplayLoginModal] = useState(false);

  const handleDisplayLoginModal = () => setDisplayLoginModal(true);
  const handleCloseDisplayLoginModal = () => setDisplayLoginModal(false);

  return (
    <>
      <BorderedDiv className="cursor-pointer" onClick={handleDisplayLoginModal}>
        Ввойти
      </BorderedDiv>
      {displayLoginModal && (
        <LoginModal onExit={handleCloseDisplayLoginModal} />
      )}
    </>
  );
};
