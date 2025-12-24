import { useAppStore } from '@/shared/storage/store';
import { GoogleIcon, QuestionIcon } from '@/shared/icons';
import { WithTooltip } from '../../WithTooltip';
import { useState } from 'react';
import { BorderedDiv, ModalContainer } from '@/components/atoms';

const TOOLTIP_TEXT = `Это - количество токенов, которое вам доступно\n Приобретите платную подписку для безграниченного использования`;

export const UserInfo = () => {
  const [displayUserInfo, setDisplayUserInfo] = useState(false);

  const user = useAppStore((state) => state.user);

  const handleDisplayUserInfo = () => setDisplayUserInfo(true);
  const handleCloseDisplayUserInfo = () => setDisplayUserInfo(false);

  const handleExitAccount = () => {
    handleCloseDisplayUserInfo();
    // TODO: exiting from account logic
    // i.e. remove jwt token
  };

  return (
    <>
      <div className="flex items-center space-x-[22px]">
        <BorderedDiv className="relative">
          <WithTooltip
            className="top-[-10px] left-[-31px] w-[237px] -translate-x-full"
            tooltipText={TOOLTIP_TEXT}
          >
            <span className="mr-[11px] font-bold text-[#e56e2d]">
              {user.tokensLeft}
            </span>
            <span>токенов осталось</span>
            <QuestionIcon
              className="absolute top-[-15px] left-[-30px] hover:cursor-pointer"
            />
          </WithTooltip>
        </BorderedDiv>
        <img
          onClick={handleDisplayUserInfo}
          className="h-[33px] w-[33px] rounded-full object-cover
            hover:cursor-pointer"
          src={'https://i.sstatic.net/l60Hf.png'}
        />
      </div>
      {displayUserInfo && (
        <ModalContainer onEscape={handleCloseDisplayUserInfo}>
          <BorderedDiv
            className="flex h-[270px] w-[480px] flex-col items-center
              space-y-[50px]"
          >
            <div
              className="text-brainstormySecondary mt-[10px] w-full text-center
                text-[1.25rem] font-bold"
            >
              Вы уже ввошли в аккаунт
            </div>
            <div className="flex items-center space-x-[50px]">
              <div className="flex flex-col items-center">
                <img
                  onClick={handleDisplayUserInfo}
                  className="mb-[11px] h-[33px] w-[33px] shrink-0 grow-0
                    rounded-full object-cover hover:cursor-pointer"
                  src={'https://i.sstatic.net/l60Hf.png'}
                />

                <div>Viox</div>
              </div>
              <GoogleIcon />
            </div>
            <BorderedDiv
              className="hover:cursor-pointer"
              onClick={handleExitAccount}
            >
              Выйти из аккаунта
            </BorderedDiv>
            <div></div>
          </BorderedDiv>
        </ModalContainer>
      )}
    </>
  );
};
