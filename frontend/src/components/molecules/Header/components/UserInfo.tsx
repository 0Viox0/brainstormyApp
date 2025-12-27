import { useAppStore } from '@/shared/storage/store';
import { GoogleIcon, QuestionIcon, YandexIcon } from '@/shared/icons';
import { useState, type FC } from 'react';
import { BorderedDiv, ModalContainer } from '@/components/atoms';
import { removeJwtToken } from '@/features/auth/jwtToken';
import type { User } from '@/shared/storage/state';
import { WithTooltip } from '@/components/molecules';

const TOOLTIP_TEXT = `Это количество токенов, которое вам доступно\n Приобретите платную подписку для безграниченного использования`;

export type UserInfoProps = {
  user: User;
};

export const UserInfo: FC<UserInfoProps> = ({ user }) => {
  const [displayUserInfo, setDisplayUserInfo] = useState(false);
  const setUser = useAppStore((state) => state.setUser);

  const handleDisplayUserInfo = () => setDisplayUserInfo(true);
  const handleCloseDisplayUserInfo = () => setDisplayUserInfo(false);

  const handleExitAccount = () => {
    handleCloseDisplayUserInfo();
    removeJwtToken();
    setUser(null);
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
        <WithTooltip
          tooltipText="Аккаунт"
          className="top-[140%] left-1/2 -translate-x-1/2"
        >
          <img
            onClick={handleDisplayUserInfo}
            className="h-[33px] w-[33px] rounded-full object-cover
              hover:cursor-pointer"
            src={user.userLogoUrl}
          />
        </WithTooltip>
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
                    rounded-full object-cover"
                  src={user.userLogoUrl}
                />

                <div>{user.username}</div>
              </div>
              <WithTooltip
                tooltipText={
                  user.accountProvider === 'yandex' ? 'Яндекс' : 'Google'
                }
                className="top-1/2 left-[100%] translate-x-[7px]
                  -translate-y-1/2 text-nowrap"
              >
                {user.accountProvider === 'yandex' ? (
                  <YandexIcon />
                ) : (
                  <GoogleIcon />
                )}
              </WithTooltip>
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
