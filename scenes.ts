// One entry per 10-second scene. Times are in seconds, in sync with the narration MP3.
export const FPS = 30;
export const SCENE_SECONDS = 10;

export type Caption = {from: number; to: number; text: string};
export type SceneData = {
  id: string;
  audio: string;            // file inside /public (from the voiceover workflow)
  chapterTitle?: {small: string; big: string; at: number};
  captions: Caption[];
};

export const scenes: SceneData[] = [
  {
    id: 'ch1_scene01',
    audio: 'ch1_scene01.mp3',
    chapterTitle: {small: 'அத்தியாயம் 1', big: 'ஸ்காட்லாந்தின் ஆர்வமுள்ள சிறுவன்', at: 7.6},
    captions: [
      {from: 0.4, to: 4.8, text: 'உலகையே மாற்றிய ஒரு மருத்துவக் கண்டுபிடிப்பின் பின்னால்,'},
      {from: 4.8, to: 9.6, text: 'இயற்கையை நேசித்த ஒரு சிறுவனின் கதை இருக்கிறது!'},
    ],
  },
];
