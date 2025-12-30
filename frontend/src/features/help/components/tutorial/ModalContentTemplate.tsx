import { BorderedButton } from '@/components/atoms';
import { BorderedBrainstormyModal } from '@/components/molecules';
import { ArrowIcon, CheckmarkIcon } from '@/shared/icons';
import type { FC, ReactNode } from 'react';

export type ModalContenttemplateProps = {
  totalPages: number;
  currentPage: number;
  headerText: string;
  children: ReactNode;
  onGoForward: () => void;
  onGoBack: () => void;
};

export const ModalContentTemplate: FC<ModalContenttemplateProps> = ({
  totalPages,
  currentPage,
  headerText,
  children,
  onGoForward,
  onGoBack,
}) => {
  return (
    <BorderedBrainstormyModal title={headerText}>
      <div className="flex flex-col space-y-4">{children}</div>
      <div className="flex w-full items-center justify-between">
        <div>
          {currentPage} из {totalPages}
        </div>
        <div className="flex items-center space-x-[46px]">
          {currentPage !== 1 && (
            <BorderedButton
              onClick={onGoBack}
              className="flex h-[44px] w-[50px] rotate-[180deg] items-center
                justify-center px-0 py-0"
            >
              <ArrowIcon />
            </BorderedButton>
          )}
          <BorderedButton
            onClick={onGoForward}
            className="flex h-[44px] w-[50px] items-center justify-center px-0
              py-0"
          >
            {currentPage === totalPages ? <CheckmarkIcon /> : <ArrowIcon />}
          </BorderedButton>
        </div>
      </div>
    </BorderedBrainstormyModal>
  );
};
