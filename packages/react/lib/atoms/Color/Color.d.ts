import React from "react";
import { Spacing } from "@ds.e/foundation";
import "@navoxds.e/scss/lib/Utilities.css";
interface ColorProps {
    hexCode: string;
    width?: keyof typeof Spacing;
    height?: keyof typeof Spacing;
}
export { Spacing };
declare const Color: React.FC<ColorProps>;
export default Color;
