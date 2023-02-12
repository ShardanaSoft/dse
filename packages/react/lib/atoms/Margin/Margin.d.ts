import React from "react";
import "@navoxds.e/scss/lib/margin.css";
import { Spacing } from "@navoxds.e/foundation";
interface MarginProps {
    space?: keyof typeof Spacing;
    children: React.ReactNode;
    left?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;
}
declare const Margin: React.FC<MarginProps>;
export default Margin;
