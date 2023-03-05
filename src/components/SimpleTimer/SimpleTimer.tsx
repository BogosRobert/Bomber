import React, { FC, useEffect, useState } from "react";
import css from "./SimpleTimer.module.css";

const SimpleTimer: FC<ISimpleTimerProps> = (props) => {
  const { minutes, seconds, callbackFunction, descriptionMaybe } = props;

  const [workingSeconds, setWorkingSeconds] = useState(seconds);
  const [workingMinutes, setWorkingMinutes] = useState(minutes);

  // handle overall timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (workingSeconds === 0) {
        setWorkingMinutes((prevMinutes) => prevMinutes - 1);
        setWorkingSeconds(59);
      } else {
        setWorkingSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [workingSeconds]);

  useEffect(() => {
    if (workingMinutes === 0 && workingSeconds === 0) {
      console.log("finished");
      callbackFunction();
    }
  }, [workingMinutes, workingSeconds, callbackFunction]);

  return (
    <div className={css.wrapper}>
      {workingMinutes < 10 && "0"}
      {workingMinutes}:{workingSeconds < 10 && "0"}
      {workingSeconds}
      {descriptionMaybe && (
        <p className={css.timerDescription}>{descriptionMaybe}</p>
      )}
    </div>
  );
};

export default SimpleTimer;
