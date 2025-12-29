import { WithTooltip } from '@/components/molecules';
import { BookIcon } from '@/shared/icons/';
import { useState } from 'react';
import { ModalManager } from './ModalManager';

export const Tutorial = () => {
  const [isTutorialOpened, setIsTutorialOpened] = useState(false);

  const handleOpenTutorial = () => setIsTutorialOpened(true);
  const handleCloseTutorial = () => setIsTutorialOpened(false);

  return (
    <div>
      <WithTooltip
        tooltipText="Помощь"
        className="top-1/2 left-[-10px] -translate-x-full -translate-y-1/2"
      >
        <BookIcon
          className="hover:cursor-pointer"
          onClick={handleOpenTutorial}
        />
      </WithTooltip>
      {isTutorialOpened && (
        <ModalManager onCloseTutorial={handleCloseTutorial} />
      )}
    </div>
  );
};
