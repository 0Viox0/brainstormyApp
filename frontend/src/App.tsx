import { useState, type ChangeEvent, type FormEvent } from 'react';
import { LayersManager } from './features/ideaGraph/components/LayerManager';
import { EnterTextInput, TokensUsed } from './components/atoms';
import { Header } from './components/molecules/Header/Header';
import { YandexAuth } from './features/auth/components/YandexAuth';
import { AutoResizeTextarea } from './components/molecules';

function App() {
  const [firstIdea, setFirstIdea] = useState<string>('');
  const [displayGraph, setDisplayGraph] = useState(false);

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setFirstIdea(event.target.value);
  // };

  // const handleChange = (newText: string) => {
  //   setFirstIdea(newText);
  // };

  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setDisplayGraph(true);
  // };

  const handleSubmit = (text: string) => {
    setFirstIdea(text);
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
            <AutoResizeTextarea
              onSubmit={handleSubmit}
              placeholder="Введи начальную идею"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
