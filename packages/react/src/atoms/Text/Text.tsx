import React from "react";

import { FontSize } from "@navoxds.e/foundation";

import "@navoxds.e/scss/lib/Text.css";

export interface TextProps {
  size?: keyof typeof FontSize;
  children?: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ size = FontSize.base, children }) => {
  const className = `dse-text dse-text-${size}`;

  return <p className={className}>{children}</p>;
};

export default Text;

