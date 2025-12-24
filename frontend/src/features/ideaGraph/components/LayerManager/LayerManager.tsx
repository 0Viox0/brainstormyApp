import {
  IdeaGenerator,
  type IdeaGeneratorState,
} from '@/components/organisms/IdeaGenerator/IdeaGenerator';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from 'react';
import { useIdeasGraph } from '../../store';
import { CollapsedLayer } from '../CollapsedLayer/CollapsedLayer';
import { OpenLayer } from '../OpenLayer/Layer';
import { FetchLoadLayer } from '../OpenLayer/LayerLoader/FetchLoadLayer';
import { historyManger } from '../../sevices/contextSaver';

export type LayersManagerProps = {
  initialIdea: string;
};

export const LayersManager: FC<LayersManagerProps> = ({ initialIdea }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [newLayerData, setNewLayerData] = useState<IdeaGeneratorState>();
  const { currentLayer, isLoadingNewLayer, loadNewLayer, layers } =
    useIdeasGraph((state) => state);
  const prevLayerLength = useRef(layers.length);

  const scrollViewport = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollTo({
      top: 30,
      left: el.scrollWidth,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (prevLayerLength.current === layers.length) {
      scrollViewport();
    }

    prevLayerLength.current = layers.length;
  }, [currentLayer, scrollViewport, layers.length]);

  const handleGenerateNewLayer = (ideaGeneratorState: IdeaGeneratorState) => {
    setNewLayerData(ideaGeneratorState);
    loadNewLayer();
  };

  console.log('layers', layers);

  const renderLayres = (layerId: number | undefined): ReactNode => {
    if (!layerId) return;

    const layer = layers.find((layer) => layer.id === layerId);
    if (!layer) return;

    const chosenIdea = Object.values(layer.ideas).find((idea) => idea.chosen);

    const continueGenerating = chosenIdea && layerId !== currentLayer;

    historyManger.addHistoryItem(layer.baseIdea);

    return (
      <>
        {layer.collapsedData && layer.collapsedData.isCollapsed ? (
          <div className="mt-[374px]">
            <CollapsedLayer layerId={layer.id} />
          </div>
        ) : (
          <OpenLayer
            layerId={layer.id}
            triggerGenerateNewLayer={handleGenerateNewLayer}
          />
        )}
        {continueGenerating && renderLayres(chosenIdea.nextLayer)}
      </>
    );
  };

  return (
    <div
      ref={scrollRef}
      className="bg-brainstormyBg flex h-screen items-start overflow-x-auto
        pt-[130px] text-white"
    >
      <div className="mt-[374px]">
        <IdeaGenerator
          text={initialIdea}
          onGenerate={handleGenerateNewLayer}
          isFirstIdea={true}
        />
      </div>
      {layers.length !== 0 && renderLayres(layers[0].id)}
      {isLoadingNewLayer && newLayerData && (
        <FetchLoadLayer
          ideaGeneratorState={newLayerData}
          onMount={scrollViewport}
        />
      )}
      <div className="h-[100px] w-[600px] shrink-0 grow-0" />
    </div>
  );
};
