import { useEffect, useRef, useState } from 'react';
import { IdeaGenerator } from './components/organisms/IdeaGenerator';
import type { IdeaGeneratorState } from './components/organisms/IdeaGenerator/IdeaGenerator';
import { OpenLayer } from './features/ideaGraph/components/OpenLayer/Layer';
import { useIdeasGraph } from './features/ideaGraph/store';
import { CollapsedLayer } from './features/ideaGraph/components/CollapsedLayer/CollapsedLayer';
import { FetchLoadLayer } from './features/ideaGraph/components/OpenLayer/LayerLoader/FetchLoadLayer';

function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [newLayerData, setNewLayerData] = useState<IdeaGeneratorState>();
  const { isLoadingNewLayer, loadNewLayer, layers } = useIdeasGraph(
    (state) => state,
  );

  const handleGenerateNewLayer = (ideaGeneratorState: IdeaGeneratorState) => {
    setNewLayerData(ideaGeneratorState);
    loadNewLayer();
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (!isLoadingNewLayer) return;

    el.scrollTo({
      top: 0,
      left: el.scrollWidth,
      behavior: 'smooth',
    });
  }, [isLoadingNewLayer]);

  return (
    <div
      ref={scrollRef}
      className="bg-brainstormyBg flex h-screen items-start overflow-x-auto
        text-white"
    >
      <div className="mt-[374px]">
        <IdeaGenerator
          text="flying boats"
          onGenerate={handleGenerateNewLayer}
          isFirstIdea={true}
        />
      </div>
      {layers.map((layer) =>
        layer.collapsedData ? (
          <div className="mt-[374px]">
            <CollapsedLayer layerId={layer.id} />
          </div>
        ) : (
          <OpenLayer
            layerId={layer.id}
            triggerGenerateNewLayer={handleGenerateNewLayer}
          />
        ),
      )}
      {isLoadingNewLayer && newLayerData && (
        <FetchLoadLayer ideaGeneratorState={newLayerData} />
      )}
      <div className="h-[100px] w-[600px] shrink-0 grow-0" />
    </div>
  );
}

export default App;
