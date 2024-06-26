import SimpleTimer from "components/SimpleTimer/SimpleTimer";
import React, { useEffect, useState } from "react";
import css from "./ComboSetScreen.module.css";
import {
  audioLengthInMiliseconds,
  comboOptions,
  generateRandomIntegers,
  handleChainOfComboAudioPromises,
  handlePlayAudio,
} from "./utils";

const ComboSetScreen: React.FC<IComboSetScreenProps> = (props) => {
  const { numberOfHitsPerSet, secondsBetweenCombos, timePerSet, endSet } =
    props;

  const [comboDone, setComboDone] = useState(false);
  const [showWarmoutTimer, setShowWarmoutTimer] = useState(true);

  const endCombo = () => setComboDone(!comboDone);

  // Preloading audio files
  useEffect(() => {
    comboOptions.forEach((option) => {
      option.audio.load();
    });
  }, []);

  // Playing the combos audio
  useEffect(() => {
    if (!showWarmoutTimer) {
      setTimeout(async () => {
        const randomCombo = generateRandomIntegers(numberOfHitsPerSet);
        console.log(randomCombo);
        await handleChainOfComboAudioPromises(randomCombo, endCombo);
        console.log("done with audio");
      }, secondsBetweenCombos * 1000);
    }
  }, [comboDone, showWarmoutTimer]);

  if (showWarmoutTimer) {
    return (
      <SimpleTimer
        seconds={10}
        minutes={0}
        callbackFunction={() => setShowWarmoutTimer(false)}
        // descriptionMaybe="Incepe in"
      />
    );
  }

  return (
    <div className={css.wrapper}>
      <SimpleTimer seconds={0} minutes={timePerSet} callbackFunction={endSet} />

      <div className={css.hitsPerSetWrapper}>
        {numberOfHitsPerSet} lovituri / serie
      </div>

      <div className={css.hitsPerSetWrapper}>
        {secondsBetweenCombos} secunde intre serii
      </div>

      <button type="button" onClick={endSet} className={css.submitButton}>
        Stop
      </button>
    </div>
  );
};

export default ComboSetScreen;
