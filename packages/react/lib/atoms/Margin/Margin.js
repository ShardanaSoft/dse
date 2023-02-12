import React from 'react';
import '@navoxds.e/scss/lib/margin.css';

const Margin = ({ space = "xxxs", bottom, left, right, top, children, }) => {
    let className = "";
    if (!left && !right && !bottom && !top)
        className = `dse-margin-${space}`;
    if (left)
        className += ` dse-margin-left-${space}`;
    if (right)
        className += ` dse-margin-right-${space}`;
    if (top)
        className += ` dse-margin-top-${space}`;
    if (bottom)
        className += ` dse-margin-bottom-${space}`;
    return React.createElement("div", { className: className }, children);
};

export { Margin as default };
//# sourceMappingURL=Margin.js.map
