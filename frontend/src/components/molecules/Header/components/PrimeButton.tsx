import { BorderedDiv, ModalContainer } from '@/components/atoms';
import { CrownIcon } from '@/shared/icons';
import { useState } from 'react';

export const PrimeButton = () => {
  const [displayModal, setDisplayModal] = useState(false);

  const handleDisplayModal = () => setDisplayModal(true);
  const handleCloseModal = () => setDisplayModal(false);

  return (
    <>
      <BorderedDiv
        className="w-[144px] items-center justify-between hover:cursor-pointer"
        onClick={handleDisplayModal}
      >
        <span className="">Prime</span>
        <CrownIcon />
      </BorderedDiv>
      {displayModal && (
        <ModalContainer onEscape={handleCloseModal}>
          <BorderedDiv
            className="flex w-[480px] flex-col items-center space-y-[50px]
              pb-[20px]"
          >
            <div
              className="text-brainstormySecondary mt-[10px] w-full text-center
                text-[1.25rem] font-bold"
            >
              Совсем скоро появится ;)
            </div>
            <CrownIcon width={59} height={36} />
            <BorderedDiv
              className="hover:cursor-pointer"
              onClick={handleCloseModal}
            >
              Хорошо
            </BorderedDiv>
          </BorderedDiv>
        </ModalContainer>
      )}
    </>
  );
};
