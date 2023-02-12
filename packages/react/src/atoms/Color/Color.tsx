import React from "react";
import { Spacing } from "@ds.e/foundation";

import "@navoxds.e/scss/lib/Utilities.css";

interface ColorProps {
  hexCode: string;
  width?: keyof typeof Spacing;
  height?: keyof typeof Spacing;
}

export { Spacing };

const Color: React.FC<ColorProps> = ({
  hexCode,
  width = Spacing.sm,
  height = Spacing.sm,
}) => {
  const className = `dse-width-${width} dse-height-${height}`;
  return <div className={className} style={{ backgroundColor: hexCode }} />;
};

export default Color;

