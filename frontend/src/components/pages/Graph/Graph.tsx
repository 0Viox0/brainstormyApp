import { LayersManager } from '@/features/ideaGraph/components/LayerManager';
import { useIdeasGraph } from '@/features/ideaGraph/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const Graph = () => {
  const firstIdea = useIdeasGraph((state) => state.firstIdeaText);
  const navigate = useNavigate();

  useEffect(() => {
    if (!firstIdea || firstIdea.length === 0) {
      navigate('/');
    }
  }, [firstIdea, navigate]);

  return <LayersManager initialIdea={firstIdea!} />;
};
