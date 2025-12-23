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

    case 'generator':
      return {
        1: toIdea(response.data['1']),
        2: toIdea(response.data['2']),
        3: toIdea(response.data['3']),
        4: toIdea(response.data['4']),
        5: toIdea(response.data['5']),
        6: toIdea(response.data['6']),
        7: toIdea(response.data['7']),
        8: toIdea(response.data['8']),
        9: toIdea(response.data['9']),
      };

    default: {
      const _exhaustive: never = response;
      return _exhaustive;
    }
  }
};
