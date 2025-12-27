import {
  useState,
  useRef,
  useEffect,
  type KeyboardEvent,
  type FC,
  type ChangeEvent,
} from 'react';
import { cn } from '@/shared/utils';
import { BorderedDiv } from '@/components/atoms';
import { TextLengthLimit } from '@/components/atoms/TextLengthLimit/TextLengthLimit';
import { hasJwtToken, isTokenExpired } from '@/features/auth/jwtToken';
import { LoginModal } from '@/features/auth/components';

type AutoResizeTextareaProps = {
  onSubmit: (text: string) => void;
  placeholder?: string;
  initialValue?: string;
  maxHeight?: number;
  maxLength?: number;
  submitButtonText?: string;
  className?: string;
  showCharCount?: boolean;
};

export const AutoResizeTextarea: FC<AutoResizeTextareaProps> = ({
  onSubmit,
  placeholder = 'Type your message...',
  initialValue = '',
  maxHeight = 200,
  maxLength = import.meta.env.VITE_PROMPT_MAX_SYMBOLS,
  submitButtonText = 'Начать генерировать',
  className,
}) => {
  const [text, setText] = useState(initialValue);
  const [displayLoginModal, setDisplayLoginModal] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';

    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${newHeight}px`;

    if (textarea.scrollHeight > maxHeight) {
      textarea.style.overflowY = 'auto';
    } else {
      textarea.style.overflowY = 'hidden';
    }
  }, [text, maxHeight]);

  const handleDisplayModal = () => setDisplayLoginModal(true);
  const handleCloseDisplayModal = () => setDisplayLoginModal(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };

  const handleSubmit = () => {
    if (!hasJwtToken() || isTokenExpired()) {
      handleDisplayModal();
      return;
    }

    const trimmedText = text.trim();
    if (trimmedText && trimmedText.length <= maxLength) {
      onSubmit(trimmedText);
      setText('');

      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.overflowY = 'hidden';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <BorderedDiv
        ref={containerRef}
        className={cn(
          'flex w-[480px] flex-col gap-3 rounded-[9px] border-[1px] p-[22px]',
          className,
        )}
      >
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`scrollbar-thin scrollbar-thumb-brainstormySecondary
              scrollbar-track-transparent min-h-[40px] w-full resize-none
              overflow-hidden bg-transparent leading-relaxed text-white
              focus:outline-none`}
            style={{
              maxHeight: `${maxHeight}px`,
            }}
            rows={1}
            maxLength={maxLength}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <TextLengthLimit text={text} maxLength={maxLength} />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!text.trim() || text.length > maxLength}
            className={cn(
              `border-brainstormySecondary bg-brainstormyBg
              hover:bg-brainstormySecondary/10 active:bg-brainstormySecondary/20
              focus:ring-brainstormySecondary/50 flex items-center
              justify-center rounded-[9px] border-[1px] px-6 py-2 transition-all
              duration-200 hover:cursor-pointer focus:ring-2 focus:outline-none
              disabled:cursor-not-allowed disabled:opacity-50`,
              (!text.trim() || text.length > maxLength) &&
                'cursor-not-allowed opacity-50',
            )}
          >
            {submitButtonText}
          </button>
        </div>
      </BorderedDiv>
      {displayLoginModal && <LoginModal onExit={handleCloseDisplayModal} />}
    </>
  );
};
