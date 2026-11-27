import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {Doodle} from './Doodle';
import {Captions, fontFamily} from './Captions';
import {SceneData} from './scenes';

const sphere = <sphereGeometry args={[1, 24, 24]} />;
const box = <boxGeometry args={[1, 1, 1]} />;
const cone = <coneGeometry args={[1, 1, 4]} />;
const cyl = <cylinderGeometry args={[0.5, 0.6, 1, 16]} />;

export const Scene01: React.FC<{scene: SceneData}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {fps, width, height, durationInFrames} = useVideoConfig();
  const t = frame / fps;
  // slow storybook camera move: dolly in + gentle sway
  const z = interpolate(frame, [0, durationInFrames], [1.2, -0.8]);
  const sway = Math.sin(t * 0.6) * 0.06;
  const title = scene.chapterTitle;
  const titleOp = title ? interpolate(t, [title.at, title.at + 0.7], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0;

  return (
    <AbsoluteFill style={{background: 'linear-gradient(#bfe3f5, #fdf0d0 70%)'}}>
      {/* narration leads; music is optional and sits underneath */}
      <Audio src={staticFile(scene.audio)} />
      {/* <Audio src={staticFile('music.mp3')} volume={0.12} loop /> */}

      <ThreeCanvas width={width} height={height} camera={{position: [0, 1.2, 9], fov: 40}}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 8, 6]} intensity={1.2} />
        <group position={[0, 0, z]} rotation={[0, sway, 0]}>
          {/* 0.4s - 2.5s : sky and land */}
          <Doodle geo={sphere} color="#ffd25e" at={0.5} pos={[3, 5, -4]} scale={0.9} />
          <Doodle geo={sphere} color="#ffffff" at={0.9} pos={[-2.6, 4.6, -4]} scale={[1.3, 0.6, 0.6]} />
          <Doodle geo={sphere} color="#ffffff" at={1.2} pos={[-1.6, 4.4, -4]} scale={[0.9, 0.5, 0.5]} />
          <Doodle geo={sphere} color="#9fd48a" at={1.5} pos={[-2, -3.2, -3]} scale={[7, 3, 3]} />
          <Doodle geo={sphere} color="#6fbf6a" at={2.1} pos={[2, -4.2, 0]} scale={[6, 2.6, 3]} />
          {/* 3s - 4.5s : farmhouse */}
          <Doodle geo={box} color="#f2c9a0" at={3.0} pos={[0, -0.9, 0.5]} scale={[2.4, 1.6, 1.8]} />
          <Doodle geo={cone} color="#d9654f" at={3.6} pos={[0, 0.5, 0.5]} scale={[1.9, 1.2, 1.9]} rot={[0, Math.PI / 4, 0]} />
          <Doodle geo={box} color="#b9684a" at={4.1} pos={[0, -1.3, 1.45]} scale={[0.45, 0.8, 0.1]} />
          <Doodle geo={box} color="#a9dcf0" at={4.3} pos={[-0.8, -0.7, 1.45]} scale={[0.5, 0.5, 0.1]} />
          {/* 5.2s : sheep */}
          <Doodle geo={sphere} color="#ffffff" at={5.2} pos={[-2.6, -2.1, 1.5]} scale={[0.9, 0.6, 0.6]} />
          <Doodle geo={sphere} color="#5a4a55" at={5.5} pos={[-1.8, -2.0, 1.6]} scale={0.3} />
          {/* 6.2s : the curious boy */}
          <Doodle geo={cyl} color="#4f7fd1" at={6.2} pos={[2.3, -1.9, 1.5]} scale={[0.7, 1.0, 0.7]} />
          <Doodle geo={sphere} color="#ffe0bd" at={6.6} pos={[2.3, -1.1, 1.5]} scale={0.38} />
          <Doodle geo={cyl} color="#e0523f" at={6.9} pos={[2.3, -0.75, 1.5]} scale={[0.5, 0.18, 0.5]} />
        </group>
      </ThreeCanvas>

      {title && (
        <div style={{position: 'absolute', top: 150, left: 90, right: 90, opacity: titleOp, fontFamily,
          textAlign: 'center', background: '#fffaf0', border: '5px solid #3a3350', borderRadius: 40, padding: '30px 20px'}}>
          <div style={{fontSize: 44, color: '#d9654f', fontWeight: 500}}>{title.small}</div>
          <div style={{fontSize: 52, color: '#2b2a33', fontWeight: 700, marginTop: 8}}>{title.big}</div>
        </div>
      )}
      <Captions captions={scene.captions} />
    </AbsoluteFill>
  );
};
