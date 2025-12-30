import { BorderedDiv, ModalContainer } from '@/components/atoms';
import { BrainstormyLogo } from '@/shared/icons';
import type { FC, ReactNode } from 'react';

export type BorderedBrainstormyModalProps = {
  title: string;
  children: ReactNode;
  onModalEscape?: () => void;
};

export const BorderedBrainstormyModal: FC<BorderedBrainstormyModalProps> = ({
  title,
  children,
  onModalEscape,
}) => {
  return (
    <ModalContainer onEscape={onModalEscape}>
      <BorderedDiv
        className="text-brainstormySecondary flex flex-col space-y-[52px]
          px-[50px] py-[37px]"
      >
        <div className="flex w-full items-center justify-between">
          <BrainstormyLogo />
          <div className="text-[2rem] font-bold">{title}</div>
          <BrainstormyLogo />
        </div>
        {children}
      </BorderedDiv>
    </ModalContainer>
  );
};
