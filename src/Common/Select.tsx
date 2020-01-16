import React from "react";
 
type OptionValue = string | number;

export type Option<T extends OptionValue> = {
  value: T;
  label: string;
};

type Props<T extends OptionValue> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function Select<T extends OptionValue>(props: Props<T>) {
  function handleOnChange(e: React.FormEvent<HTMLSelectElement>) {
    const { selectedIndex } = e.currentTarget;
    const selectedOption = props.options[selectedIndex];
    props.onChange(selectedOption.value);
  }
  return (
    <select value={props.value} onChange={handleOnChange}>
      {props.options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}