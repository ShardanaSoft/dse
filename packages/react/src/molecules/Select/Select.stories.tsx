import React from "react";
import Select from "./Select";

import { withA11y } from "@storybook/addon-a11y";

export default {
  title: "Molecules/Select",
  decorators: [withA11y],
};

const options = [
  {
    label: "Sweet pink",
    value: "pink",
  },
  {
    label: "bitter green",
    value: "green",
  },
  {
    label: "sad dark",
    value: "dark",
  },
];
export const Common = () => <Select options={options} />;

export const RenderOption = () => (
  <Select
    options={options}
    renderOption={({ getOptionRecommendedProps, option, isSelected }) => (
      <span {...getOptionRecommendedProps()}>
        {option.value} | {isSelected && "IS SELECTED"}
      </span>
    )}
  />
);

export const CustomLabel = () => (
  <Select label="Select a color pls" options={options} />
);

