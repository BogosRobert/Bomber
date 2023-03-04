import React, { useEffect, useState } from "react";
import css from "./ComboSetScreen.module.css";
import { comboOptions } from "./utils";

const audioLengthInMiliseconds = 1000;

const ComboSetScreen: React.FC<IComboSetScreenProps> = (props) => {
  const { numberOfHitsPerSet, secondsBetweenCombos, timePerSet, endSet } =
    props;

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(timePerSet);
  const [comboDone, setComboDone] = useState(false);

  const handlePlayAudio = (foundCombo: any) => {
    return foundCombo?.audio.play();
  };

  function generateRandomIntegers(count: number): number[] {
    const result: number[] = [];

    for (let i = 0; i < count; i++) {
      const randomInteger = Math.floor(Math.random() * 8) + 1;
      result.push(randomInteger);
    }

    return result;
  }

  // handle overall timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds === 0) {
        setMinutes((prevMinutes) => prevMinutes - 1);
        setSeconds(59);
      } else {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      endSet();
    }
  }, [minutes, seconds, endSet]);

  // Preloading audio files
  useEffect(() => {
    comboOptions.forEach((option) => {
      option.audio.load();
    });
  }, []);

  // Playing the first combo of audio files
  useEffect(() => {
    const randomCombo = generateRandomIntegers(numberOfHitsPerSet);

    const promises = randomCombo.map((c, index) => {
      const foundCombo = comboOptions.find((i) => i.value === c);
      handlePlayAudio(foundCombo);
      if (index === randomCombo?.length - 1) {
        setComboDone(!comboDone);
        console.log("combo done");
      }
    });

    Promise.all(promises);
  }, []);

  // Playing the rest of the combos of audio files
  useEffect(() => {
    const intervalTimeSpan =
      secondsBetweenCombos * 1000 +
      numberOfHitsPerSet * audioLengthInMiliseconds;
    const interval = setInterval(() => {
      const randomCombo = generateRandomIntegers(numberOfHitsPerSet);

      const promises = randomCombo.map((c, index) => {
        const foundCombo = comboOptions.find((i) => i.value === c);
        handlePlayAudio(foundCombo);
        if (index === randomCombo?.length - 1) {
          setComboDone(!comboDone);
          console.log("combo done");
        }
      });

      Promise.all(promises);
    }, intervalTimeSpan);
    return () => clearInterval(interval);
  }, [comboDone]);

  return (
    <div className={css.wrapper}>
      <div className={css.timeLeftWrapper}>
        {minutes < 10 && "0"}
        {minutes}:{seconds < 10 && "0"}
        {seconds}
      </div>

      <div className={css.hitsPerSetWrapper}>
        {numberOfHitsPerSet} lovituri / serie
      </div>

      <div className={css.hitsPerSetWrapper}>
        {secondsBetweenCombos} secunde intre serii
      </div>
    </div>
  );
};

export default ComboSetScreen;
