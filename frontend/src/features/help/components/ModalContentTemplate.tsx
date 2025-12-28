import { BorderedDiv, ModalContainer } from '@/components/atoms';
import { ArrowIcon, BrainstormyLogo } from '@/shared/icons';
import type { FC, ReactNode } from 'react';

export type ModalContenttemplateProps = {
  headerText: string;
  children: ReactNode;
};

export const ModalContentTemplate: FC<ModalContenttemplateProps> = ({
  headerText,
  children,
}) => {
  return (
    <ModalContainer>
      <BorderedDiv
        className="text-brainstormySecondary flex flex-col space-y-[52px]
          px-[50px] py-[37px]"
      >
        <div className="flex w-full items-center justify-between">
          <BrainstormyLogo />
          <div className="text-[2rem] font-bold">{headerText}</div>
          <BrainstormyLogo />
        </div>
        <div>{children}</div>
        <div className="flex w-full items-center justify-between">
          <div>1 of 6</div>
          <div className="flex items-center space-x-[46px]">
            <BorderedDiv
              className="flex h-[44px] w-[50px] rotate-[180deg] items-center
                justify-center"
            >
              <ArrowIcon />
            </BorderedDiv>
            <BorderedDiv
              className="flex h-[44px] w-[50px] items-center justify-center"
            >
              <ArrowIcon />
            </BorderedDiv>
          </div>
        </div>
      </BorderedDiv>
    </ModalContainer>
  );
};
