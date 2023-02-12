import React from 'react';
import { FontSize } from '@navoxds.e/foundation';
import '@navoxds.e/scss/lib/Text.css';

const Text = ({ size = FontSize.base, children }) => {
    const className = `dse-text dse-text-${size}`;
    return React.createElement("p", { className: className }, children);
};

export { Text as default };
//# sourceMappingURL=Text.js.map
