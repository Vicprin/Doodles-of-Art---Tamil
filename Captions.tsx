import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont} from '@remotion/google-fonts/NotoSansTamil';
import type {Caption} from './scenes';

export const {fontFamily} = loadFont('normal', {weights: ['500', '700'], subsets: ['tamil']});

export const Captions: React.FC<{captions: Caption[]}> = ({captions}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const c = captions.find((x) => t >= x.from && t < x.to);
  if (!c) return null;
  const opacity = interpolate(t, [c.from, c.from + 0.3, c.to - 0.25, c.to], [0, 1, 1, 0]);
  return (
    <div style={{position: 'absolute', left: 60, right: 60, bottom: 150, opacity, fontFamily,
      fontSize: 52, fontWeight: 500, color: '#fff', textAlign: 'center', lineHeight: 1.45,
      background: 'rgba(43,42,51,.78)', borderRadius: 34, padding: '28px 34px'}}>
      {c.text}
    </div>
  );
};
