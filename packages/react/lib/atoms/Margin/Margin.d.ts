import React from "react";
import "@navoxds.e/scss/lib/Margin.css";
import { Spacing } from "@navoxds.e/foundation";
export interface MarginProps {
    space?: keyof typeof Spacing;
    children: React.ReactNode;
    left?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;
}
declare const Margin: React.FC<MarginProps>;
export default Margin;
