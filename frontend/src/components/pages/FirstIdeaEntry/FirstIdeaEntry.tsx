import { AutoResizeTextarea } from '@/components/molecules';
import { useIdeasGraph } from '@/features/ideaGraph/store';
import { useNavigate } from 'react-router';

export const FirstIdeaEntry = () => {
  const setFirstidea = useIdeasGraph((state) => state.setFirstIdea);
  const navigate = useNavigate();

  const handleSubmit = (text: string) => {
    setFirstidea(text);
    navigate('/graph');
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2">
      <AutoResizeTextarea
        onSubmit={handleSubmit}
        placeholder="Введи начальную идею"
      />
    </div>
  );
};
