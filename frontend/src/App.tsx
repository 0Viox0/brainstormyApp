import { useState, type ChangeEvent, type FormEvent } from 'react';
import { LayersManager } from './features/ideaGraph/components/LayerManager';

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

  return displayGraph ? (
    <LayersManager initialIdea={firstIdea} />
  ) : (
    <div className="flex min-h-[100vh] items-center justify-center">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={firstIdea}
          type="text"
          className="border-brainstormySecondary text-brainstormySecondary
            h-[44px] w-[480px] rounded-[9px] border-[1px] px-[20px] font-bold
            outline-none"
          placeholder="Введи начальную идею"
        />
      </form>
    </div>
  );
}

export default App;
