import { useEffect, useState } from 'react';
import { tokenCounter } from '@/features/ideaGraph/sevices/tokensCounter';

export const TokensUsed = () => {
  const [tokens, setTokens] = useState(tokenCounter.getTokens());

  useEffect(() => {
    const unsubscribe = tokenCounter.subscribe(() => {
      setTokens(tokenCounter.getTokens());
    });
    return unsubscribe;
  }, []);

  return (
    <div
      className="fixed bottom-[40px] left-[40px] flex flex-col space-y-1
        text-[1rem]"
    >
      <div>
        Tokens used: <span className="font-bold text-[#D9784D]">{tokens}</span>
      </div>
      <div>
        That means:{' '}
        <span className="font-bold text-[#D9784D]">
          {(tokens / 1000) * 0.2}
        </span>{' '}
        ₽ spent
      </div>
    </div>
  );
};
