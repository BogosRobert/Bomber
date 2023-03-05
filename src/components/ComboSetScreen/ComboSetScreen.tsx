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

  //   utils
  const handlePlayAudio = (foundCombo: any) => {
    return new Promise((resolve, reject) => {
      foundCombo?.audio.play();
      setTimeout(() => {
        console.log(`Audio ${foundCombo?.value} has played`);
        resolve(`Audio ${foundCombo?.value} has played`);
      }, audioLengthInMiliseconds);
    });
  };

  function generateRandomIntegers(count: number): number[] {
    const result: number[] = [];
    const generatedNumbers: Set<number> = new Set();

    while (result.length < count) {
      const randomInteger = Math.floor(Math.random() * 8) + 1;

      if (!generatedNumbers.has(randomInteger)) {
        result.push(randomInteger);
        generatedNumbers.add(randomInteger);
      }
    }

    return result;
  }

  async function callPromisesInSequence(
    promises: Promise<any>[]
  ): Promise<any> {
    for (const promise of promises) {
      await promise;
    }
    return "All promises resolved";
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

    let promiseChain = Promise.resolve();
    for (let i = 0; i < randomCombo.length; i++) {
      const foundCombo = comboOptions.find((c) => c.value === randomCombo[i]);
      promiseChain = promiseChain
        .then(() => handlePlayAudio(foundCombo))
        .then(() => {
          if (i === randomCombo.length - 1) {
            setComboDone(!comboDone);
            console.log("combo done");
          }
        });
    }

    promiseChain
      .then((result) => {})
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Playing the rest of the combos of audio files
  useEffect(() => {
    const intervalTimeSpan =
      secondsBetweenCombos * 1000 +
      numberOfHitsPerSet * audioLengthInMiliseconds;
    const interval = setInterval(() => {
      const randomCombo = generateRandomIntegers(numberOfHitsPerSet);

      let promiseChain = Promise.resolve();
      for (let i = 0; i < randomCombo.length; i++) {
        const foundCombo = comboOptions.find((c) => c.value === randomCombo[i]);
        promiseChain = promiseChain
          .then(() => handlePlayAudio(foundCombo))
          .then(() => {
            if (i === randomCombo.length - 1) {
              setComboDone(!comboDone);
              console.log("combo done");
            }
          });
      }

      promiseChain
        .then((result) => {})
        .catch((error) => {
          console.error(error);
        });
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
