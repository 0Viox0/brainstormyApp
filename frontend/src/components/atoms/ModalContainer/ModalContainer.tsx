import { useEffect, type FC, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export type ModalContainerProps = {
  children: ReactNode;
  onEscape?: () => void;
};

export const ModalContainer: FC<ModalContainerProps> = ({
  children,
  onEscape,
}) => {
  useEffect(() => {
    if (!onEscape) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onEscape();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return createPortal(
    <div
      className="fixed top-0 left-0 z-[100] h-[100vh] w-[100vw]
        backdrop-blur-xl"
      onClick={onEscape}
    >
      <div
        className="absolute top-1/2 left-1/2 z-50 -translate-1/2"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};
