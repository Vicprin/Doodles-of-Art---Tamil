import React from 'react';
import {Composition, Series} from 'remotion';
import {FPS, SCENE_SECONDS, scenes} from './scenes';
import {Scene01} from './Scene01';

const F = FPS * SCENE_SECONDS; // exactly 10s per scene

// Whole chapter = scenes played back to back (add more scene components as you build them)
const Chapter1: React.FC = () => (
  <Series>
    {scenes.map((s) => (
      <Series.Sequence key={s.id} durationInFrames={F}>
        <Scene01 scene={s} />
      </Series.Sequence>
    ))}
  </Series>
);

export const Root: React.FC = () => (
  <>
    <Composition id="Scene01" component={Scene01} width={1080} height={1920} fps={FPS}
      durationInFrames={F} defaultProps={{scene: scenes[0]}} />
    <Composition id="Chapter1" component={Chapter1} width={1080} height={1920} fps={FPS}
      durationInFrames={F * scenes.length} />
  </>
);
