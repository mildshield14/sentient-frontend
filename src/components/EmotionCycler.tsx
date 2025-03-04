import { useState, useEffect } from "react";
import Logo from "./Logo";
import emotionsData from "../model/emotions.json";

type Emotion = 'happy' | 'sad' | 'angry' | 'neutral' | 'confusion';

const emotions: Emotion[] = emotionsData as Emotion[];

const EmotionCycler = () => {
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>("confusion");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmotion((prev) => {
        const currentIndex = emotions.indexOf(prev);
        const nextIndex = (currentIndex + 1) % emotions.length;
        return emotions[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const def_emotion: Emotion = 'happy';
  return <Logo emotion={currentEmotion ? currentEmotion : def_emotion} />;
};

export default EmotionCycler;