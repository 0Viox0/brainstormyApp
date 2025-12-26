import { cn } from '@/shared/utils';
import type { FC } from 'react';

export type TextLengthLimitProps = {
  text: string;
  maxLength: number;
};

export const TextLengthLimit: FC<TextLengthLimitProps> = ({
  text,
  maxLength,
}) => {
  const isNearLimit = () => {
    const percentage = (text.length / maxLength) * 100;
    return percentage >= 80;
  };

  const isAtLimit = () => {
    const isLimitReached = text.length >= maxLength;

    return isLimitReached;
  };

  return (
    <div>
      <div className="mt-2 flex justify-start">
        <span
          className={cn(
            'text-xs',
            isNearLimit() && !isAtLimit() && 'text-yellow-500',
            isAtLimit() && 'text-red-500',
            !isNearLimit() && !isAtLimit() && 'text-gray-400',
          )}
        >
          {text.length} / {maxLength}
        </span>
      </div>

      <div className="text-xs text-gray-400">
        {isAtLimit() ? (
          <span className="text-red-500">Достигнут лимит символов</span>
        ) : isNearLimit() ? (
          <span className="text-yellow-500">Приближаетесь к лимиту</span>
        ) : null}
      </div>
    </div>
  );
};
