import React from "react";
import { text, select } from "@storybook/addon-knobs";

import Color, { Spacing } from "./Color";

export default {
  title: "Atoms/Color",
};

export const Common = () => <Color hexCode={text("hexCode", "pink")} />;

export const CustomDimension = () => (
  <Color
    hexCode={text("hexCode", "pink")}
    width={select("width", Object.values(Spacing), "xxl")}
    height={select("Height", Object.values(Spacing), "xxl")}
  />
);

