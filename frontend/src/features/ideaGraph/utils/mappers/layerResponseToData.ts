import type { LayerDataResponse } from '../../data/types';
import type { Idea, IdeasData, ScamperData } from '../../store/state';

const toIdea = (content: string): Idea => ({
  content,
});

export const toLayerData = (response: LayerDataResponse): IdeasData => {
  switch (response.type) {
    case 'scamper':
      return {
        s: toIdea(response.data.s),
        c: toIdea(response.data.c),
        a: toIdea(response.data.a),
        m: toIdea(response.data.m),
        p: toIdea(response.data.p),
        e: toIdea(response.data.e),
        r: toIdea(response.data.r),
      } as ScamperData;

    case 'sixHats':
      return {
        blue: toIdea(response.data.blue),
        white: toIdea(response.data.white),
        green: toIdea(response.data.green),
        yellow: toIdea(response.data.yellow),
        black: toIdea(response.data.black),
        red: toIdea(response.data.red),
      };

    default: {
      const _exhaustive: never = response;
      return _exhaustive;
    }
  }
};
