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

interface IMobileSelectFieldProps {
  name: string;
  id: string;
  options: {
    key: string | number;
    label: string | number;
  }[];
  label: string;
}

interface IMobileSelectFieldComponent {
  input: {
    onChange: (value: string | number) => void;
    value: string;
  };
  label?: string;
}
