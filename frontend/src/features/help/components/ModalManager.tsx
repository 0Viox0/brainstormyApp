import { useState, type FC, type ReactNode } from 'react';
import { ModalContentTemplate } from './ModalContentTemplate';
import {
  Controls,
  GeneralAppUse,
  GeneralDescriptionPage,
  GoBackFunctionalityShowcase,
  IdeasAndLevels,
  RightWrong,
} from './tutorialPages';

export type ModalManagerProps = {
  onCloseTutorial: () => void;
};

type Page = {
  title: string;
  content: ReactNode;
};

type TutorialPages = Page[];

export const ModalManager: FC<ModalManagerProps> = ({ onCloseTutorial }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pages: TutorialPages = [
    {
      title: 'О приложении',
      content: <GeneralDescriptionPage />,
    },
    {
      title: 'Идея и уровни',
      content: <IdeasAndLevels />,
    },
    {
      title: 'Что вводить в начале?',
      content: <RightWrong />,
    },
    {
      title: 'Как работать с приложением',
      content: <Controls />,
    },
    {
      title: 'Как работать с приложением',
      content: <GeneralAppUse />,
    },
    {
      title: 'Как работать с приложением',
      content: <GoBackFunctionalityShowcase />,
    },
  ];

  const handleGoBack = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleGoForward = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pages.length));

    if (currentPage === pages.length) {
      onCloseTutorial();
    }
  };

  return (
    <ModalContentTemplate
      headerText={pages[currentPage - 1].title}
      totalPages={pages.length}
      currentPage={currentPage}
      onGoBack={handleGoBack}
      onGoForward={handleGoForward}
    >
      {pages[currentPage - 1].content}
    </ModalContentTemplate>
  );
};
