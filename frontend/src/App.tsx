import { useState, type ChangeEvent, type FormEvent } from 'react';
import { LayersManager } from './features/ideaGraph/components/LayerManager';
import { TokensUsed } from './components/atoms';
import { Header } from './components/molecules/Header/Header';
import { YandexAuth } from './features/auth/components/YandexAuth';

function App() {
  const [firstIdea, setFirstIdea] = useState<string>('');
  const [displayGraph, setDisplayGraph] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstIdea(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisplayGraph(true);
  };

  return (
    <>
      <Header />
      <YandexAuth />
      <div className="min-h-[100vh]">
        {displayGraph ? (
          <div>
            <LayersManager initialIdea={firstIdea} />
            <TokensUsed />
          </div>
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-1/2">
            <form onSubmit={handleSubmit}>
              <input
                onChange={handleChange}
                value={firstIdea}
                type="text"
                className="border-brainstormySecondary text-brainstormySecondary
                  h-[44px] w-[480px] rounded-[9px] border-[1px] px-[20px]
                  font-bold outline-none"
                placeholder="Введи начальную идею"
              />
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
