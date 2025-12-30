import { BorderedButton } from '@/components/atoms';
import { BorderedBrainstormyModal } from '@/components/molecules';
import { BookIcon, ExclamationMark } from '@/shared/icons';
import { ModalManager } from './tutorial/ModalManager';
import { useEffect, useState, type FC } from 'react';
import { Reference } from './reference';
import { useAppStore } from '@/shared/storage/store';

export type MainHelpEntryProps = {
  onCloseHelpEntry: () => void;
};

export const MainHelpEntry: FC<MainHelpEntryProps> = ({ onCloseHelpEntry }) => {
  const user = useAppStore((state) => state.user);
  const [isTutorialOpened, setIsTutorialOpened] = useState(false);
  const [isReferenceOpened, setIsReferenceOpened] = useState(false);

  useEffect(() => {
    if (user?.isNew) {
      setIsTutorialOpened(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.isNew]);

  const handleOpenTutorial = () => setIsTutorialOpened(true);
  const handleCloseTutorial = () => setIsTutorialOpened(false);

  const handleOpenReference = () => setIsReferenceOpened(true);
  const handleCloseReference = () => setIsReferenceOpened(false);

  return (
    <>
      <BorderedBrainstormyModal
        title="Brainstormy"
        onModalEscape={onCloseHelpEntry}
      >
        <div className="flex w-[500px] items-center justify-around">
          <BorderedButton
            className="flex h-[200px] w-[150px] flex-col items-center space-y-2"
            onClick={handleOpenReference}
          >
            <ExclamationMark />
            <div className="font-bold">Справка</div>
          </BorderedButton>
          <BorderedButton
            className="flex h-[200px] w-[150px] flex-col items-center space-y-2"
            onClick={handleOpenTutorial}
          >
            <BookIcon />
            <div className="font-bold">Обучение</div>
          </BorderedButton>
        </div>
      </BorderedBrainstormyModal>

      {isTutorialOpened && (
        <ModalManager onCloseTutorial={handleCloseTutorial} />
      )}
      {isReferenceOpened && (
        <Reference onCloseReference={handleCloseReference} />
      )}
    </>
  );
};
