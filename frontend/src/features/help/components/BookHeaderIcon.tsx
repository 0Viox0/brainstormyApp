import { WithTooltip } from '@/components/molecules';
import { BookIcon } from '@/shared/icons/';
import { MainHelpEntry } from './MainHelpEntry';
import { useState } from 'react';

export const BookHeaderIcon = () => {
  const [isHelpEntryOpened, setIsHelpEntryOpened] = useState(false);

  const closeHelpEntry = () => setIsHelpEntryOpened(false);
  const openHelpEntry = () => setIsHelpEntryOpened(true);

  return (
    <div>
      <WithTooltip
        tooltipText="Помощь"
        className="top-1/2 left-[-10px] -translate-x-full -translate-y-1/2"
      >
        <BookIcon className="hover:cursor-pointer" onClick={openHelpEntry} />
      </WithTooltip>
      {isHelpEntryOpened && <MainHelpEntry onCloseHelpEntry={closeHelpEntry} />}
    </div>
  );
};
