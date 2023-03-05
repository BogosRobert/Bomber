interface IMainFormValues {
  numberOfHitsPerSet: number;
  secondsBetweenCombos: number;
  timePerSet: number;
}

interface IComboSet {
  numberOfHitsPerSet: number;
  secondsBetweenCombos: number;
  timePerSet: number;
  started: boolean;
}

interface IComboSetScreenProps {
  numberOfHitsPerSet: number;
  secondsBetweenCombos: number;
  timePerSet: number;
  started: boolean;
  endSet: () => void;
}

interface ISimpleTimerProps {
  minutes: number;
  seconds: number;
  callbackFunction: () => void;
  descriptionMaybe?: string;
}
