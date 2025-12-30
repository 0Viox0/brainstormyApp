import { WithTooltip } from '@/components/molecules';
import { BookIcon } from '@/shared/icons/';
import { MainHelpEntry } from './MainHelpEntry';
import { useEffect, useState } from 'react';
import { useAppStore } from '@/shared/storage/store';

export const BookHeaderIcon = () => {
  const user = useAppStore((state) => state.user);
  const [isHelpEntryOpened, setIsHelpEntryOpened] = useState(false);

  useEffect(() => {
    if (user?.isNew) {
      setIsHelpEntryOpened(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.isNew]);

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
