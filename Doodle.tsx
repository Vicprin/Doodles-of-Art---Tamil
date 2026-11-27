import React from 'react';
import * as THREE from 'three';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

type V3 = [number, number, number];
type Props = {
  geo: React.ReactNode;     // e.g. <sphereGeometry args={[1, 24, 24]} />
  color: string;
  at: number;               // appears at this second (sync with narration)
  pos: V3;
  scale?: V3 | number;
  rot?: V3;
};

/** A "doodle" object: toon-shaded body + inverted-hull ink outline,
 *  grows in with a springy pop and wobbles at ~10fps like hand-drawn boil. */
export const Doodle: React.FC<Props> = ({geo, color, at, pos, scale = 1, rot = [0, 0, 0]}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - at * fps, fps, config: {damping: 11, stiffness: 90}});
  const boil = Math.floor(frame / 3);
  const jx = Math.sin(boil * 12.9898 + pos[0] * 7) * 0.015;
  const jy = Math.cos(boil * 78.233 + pos[1] * 5) * 0.015;
  const s: V3 = typeof scale === 'number' ? [scale, scale, scale] : scale;
  return (
    <group position={[pos[0] + jx, pos[1] + jy, pos[2]]} rotation={rot} scale={[s[0] * p, s[1] * p, s[2] * p]}>
      <mesh>{geo}<meshToonMaterial color={color} /></mesh>
      <mesh scale={1.07}>{geo}<meshBasicMaterial color="#3a3350" side={THREE.BackSide} /></mesh>
    </group>
  );
};
