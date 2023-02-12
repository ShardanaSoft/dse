import React from "react";
import { FontSize } from "@navoxds.e/foundation";
import "@navoxds.e/scss/lib/Text.css";
export interface TextProps {
    size?: keyof typeof FontSize;
    children?: React.ReactNode;
}
declare const Text: React.FC<TextProps>;
export default Text;
