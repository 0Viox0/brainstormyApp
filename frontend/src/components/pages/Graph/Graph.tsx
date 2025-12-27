import { LayersManager } from '@/features/ideaGraph/components/LayerManager';
import { useIdeasGraph } from '@/features/ideaGraph/store';
import { useNavigate } from 'react-router';

export const Graph = () => {
  const firstIdea = useIdeasGraph((state) => state.firstIdeaText);
  const navigate = useNavigate();

  if (!firstIdea) {
    navigate('/');
  }

  return (
    <>
      <LayersManager initialIdea={firstIdea!} />
    </>
  );
};
