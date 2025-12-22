import { useState } from 'react';
import { IdeaGenerator } from './components/organisms/IdeaGenerator';
import type { IdeaGeneratorState } from './components/organisms/IdeaGenerator/IdeaGenerator';
import {
  OpenLayer,
  type OpenLayerProps,
} from './features/ideaGraph/components/OpenLayer/Layer';
import { useIdeasGraph } from './features/ideaGraph/store';
import { CollapsedLayer } from './features/ideaGraph/components/CollapsedLayer/CollapsedLayer';

function App() {
  const [newLayerData, setNewLayerData] =
    useState<OpenLayerProps['layerData']>();
  const { isLoadingNewLayer, loadNewLayer, layers } = useIdeasGraph(
    (state) => state,
  );

  const handleGenerateNewLayer = (ideaGeneratorState: IdeaGeneratorState) => {
    console.log('request to generate idea', ideaGeneratorState);
    setNewLayerData({
      method: ideaGeneratorState.method,
      baseIdea: ideaGeneratorState.text,
      helpingPrompt: ideaGeneratorState.prompt,
    });
    loadNewLayer();
  };

  console.log(layers);

  return (
    <div className="bg-brainstormyBg flex min-h-screen text-white">
      <IdeaGenerator
        text="flying boats"
        onGenerate={handleGenerateNewLayer}
        isFirstIdea={true}
      />
      {layers.map((layer) =>
        layer.isCollapsed ? (
          <CollapsedLayer layerId={layer.id} />
        ) : (
          <OpenLayer
            layerId={layer.id}
            triggerGenerateNewLayer={handleGenerateNewLayer}
            layerData={{
              method: layer.method,
              baseIdea: layer.baseIdea,
              helpingPrompt: layer.helperPrompt,
            }}
          />
        ),
      )}
      {isLoadingNewLayer && newLayerData && (
        <OpenLayer
          triggerGenerateNewLayer={handleGenerateNewLayer}
          layerData={newLayerData}
        />
      )}
    </div>
  );
}

export default App;
