import React, { FC, useState } from "react";
import css from "./MobileSelectField.module.css";
import { Field } from "react-final-form";

const MobileSelectField: FC<IMobileSelectFieldProps> = (props) => {
  const { id, name, options, label } = props;

  const [menuOpen, setMenuOpen] = useState(false);

  const selectField = ({
    input: { onChange, value },
    label,
  }: IMobileSelectFieldComponent) => {
    const placeholder = options.find((o) => o.key === value)?.label || "Select";

    const handleSelectOption = (value: string | number) => {
      onChange(value);
    };
    return (
      <div className={css.wrapper}>
        <div className={css.label}>{label}</div>
        <div className={css.selectWrapper} onClick={() => setMenuOpen(true)}>
          {placeholder}
        </div>
        {menuOpen && (
          <div className={css.menuWrapper}>
            {options.map((o) => {
              return (
                <div
                  className={css.menuItem}
                  onClick={() => {
                    handleSelectOption(o.key);
                    setMenuOpen(false);
                  }}
                >
                  {o.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return <Field id={id} name={name} label={label} component={selectField} />;
};

export default MobileSelectField;
