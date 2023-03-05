import ComboSetScreen from "components/ComboSetScreen/ComboSetScreen";
import SimpleTimer from "components/SimpleTimer/SimpleTimer";
import React, { useState } from "react";

import { Form, Field } from "react-final-form";
//style
import css from "./LandingPage.module.css";
import {
  numberOfHitsPerSetOptions,
  secondsBetweenCombosOptions,
  timePerSetOptions,
} from "./utils";

const LandingPage: React.FC = () => {
  const [comboSetInfo, setComboSetInfo] = useState<IComboSet>({
    numberOfHitsPerSet: 0,
    secondsBetweenCombos: 0,
    timePerSet: 0,
    started: false,
  });

  const required = (value: any) => (value ? undefined : "Required");

  const onSubmit = (values: IMainFormValues) => {
    setComboSetInfo({ ...values, started: true });
  };

  const endSet = () =>
    setComboSetInfo({
      numberOfHitsPerSet: 0,
      secondsBetweenCombos: 0,
      timePerSet: 0,
      started: false,
    });

  if (comboSetInfo?.started) {
    return <ComboSetScreen {...comboSetInfo} endSet={endSet} />;
  }

  return (
    <div className={css.wrapper}>
      <Form
        initialValues={{
          numberOfHitsPerSet: 1,
          secondsBetweenCombos: 1,
          timePerSet: 1,
        }}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className={css.mainForm}>
            <div className={css.selectFieldWrapper}>
              <label className={css.selectFieldLabel}>Lovituri per serie</label>
              <Field
                name="numberOfHitsPerSet"
                component="select"
                validate={required}
                className={css.selectInput}
              >
                {numberOfHitsPerSetOptions.map((o) => {
                  return <option value={o.key}>{o.label}</option>;
                })}
              </Field>
            </div>
            <div className={css.selectFieldWrapper}>
              <label className={css.selectFieldLabel}>Timp intre serii</label>
              <Field
                name="secondsBetweenCombos"
                component="select"
                validate={required}
                className={css.selectInput}
              >
                {secondsBetweenCombosOptions.map((o) => {
                  return <option value={o.key}>{o.label}</option>;
                })}
              </Field>
            </div>
            <div className={css.selectFieldWrapper}>
              <label className={css.selectFieldLabel}>Durata repriza</label>
              <Field
                name="timePerSet"
                component="select"
                validate={required}
                className={css.selectInput}
              >
                {timePerSetOptions.map((o) => {
                  return <option value={o.key}>{o.label}</option>;
                })}
              </Field>
            </div>
            <button type="submit" className={css.submitButton}>
              Start
            </button>
          </form>
        )}
      />
    </div>
  );
};

export default LandingPage;
