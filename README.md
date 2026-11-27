# Doodle of Art – 3D (Three.js + Remotion)

## Setup (once)
```
npm i --save-exact remotion@latest @remotion/cli@latest @remotion/three@latest @remotion/google-fonts@latest
npm i three @react-three/fiber@8 react@18 react-dom@18
npm i -D typescript @types/react@18 @types/three
```
(All `remotion` / `@remotion/*` packages must be the same version, hence `--save-exact`.)

## Audio
Copy the MP3s from the voiceover project (`audio/ch1_scene01.mp3`) into `public/`.
For background music, add `public/music.mp3` and uncomment the `<Audio ... music.mp3>` line in `src/Scene01.tsx`.

## Run
- Preview: `npm run dev` (Remotion Studio)
- Render one scene: `npm run render` -> `out/scene01.mp4` (1080x1920, 30fps, exactly 10s)
- Render the chapter: `npm run render:all`

## Add scenes
Add an entry in `src/scenes.ts` (audio file, caption timings in seconds). Build each new 3D scene
as a copy of `Scene01.tsx` using `<Doodle at={seconds} .../>` so each object appears when the narration reaches it.
