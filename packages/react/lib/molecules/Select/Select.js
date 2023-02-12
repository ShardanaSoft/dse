import React, { useState, useRef, useEffect, createRef } from 'react';
import Text from '../../atoms/Text/Text.js';
import '@navoxds.e/scss/lib/Select.css';

const getNextOptionIndex = (currentIndex, options) => {
    if (currentIndex === null)
        return 0;
    if (currentIndex === options.length - 1)
        return 0;
    return currentIndex + 1;
};
const getPreviousOptionIndex = (currentIndex, options) => {
    if (currentIndex === null)
        return 0;
    if (currentIndex === 0)
        return options.length - 1;
    return currentIndex - 1;
};
const Select = ({ onOptionSelected: handler, label = "Select an option", options = [], renderOption, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [highlightedIndex, setHighlightedIndex] = useState(null);
    const labelRef = useRef(null);
    const [optionRefs, setOptionRefs] = useState([]);
    const [overlayTop, setOverlayTop] = useState(0);
    const onOptionSelected = (option, optionIndex) => {
        if (handler)
            handler(option, optionIndex);
        setSelectedIndex(optionIndex);
        setIsOpen((prev) => !prev);
    };
    const onLabelClick = () => {
        if (!isOpen) {
            highlightOption(0);
        }
        setIsOpen((prev) => !prev);
    };
    useEffect(() => {
        setOverlayTop(labelRef.current?.offsetHeight || 0);
    }, [labelRef.current?.offsetHeight]);
    const KEY_CODES = {
        ENTER: "Enter",
        SPACE: " ",
        DOWN_ARROW: "ArrowDown",
        UP_ARROW: "ArrowUp",
        ESC: "Escape",
    };
    const highlightOption = (optionIndex) => {
        setHighlightedIndex(optionIndex);
    };
    const onButtonKeyDown = (event) => {
        event.preventDefault();
        console.log("button keydown", event.key);
        optionRefs[0].current?.focus();
        if ([KEY_CODES.DOWN_ARROW, KEY_CODES.ENTER, KEY_CODES.SPACE].includes(event.key)) {
            if (!isOpen) {
                setIsOpen(true);
                highlightOption(0);
            }
        }
    };
    useEffect(() => {
        setOptionRefs(options.map((_) => createRef()));
    }, [options.length]);
    useEffect(() => {
        if (highlightedIndex !== null && isOpen) {
            const ref = optionRefs[highlightedIndex];
            if (ref && ref.current)
                ref.current.focus();
        }
    }, [isOpen, highlightedIndex]);
    const onOptionKeyDown = (event) => {
        switch (event.key) {
            case KEY_CODES.ESC:
                setIsOpen(false);
                break;
            case KEY_CODES.DOWN_ARROW:
                highlightOption(getNextOptionIndex(highlightedIndex, options));
                break;
            case KEY_CODES.UP_ARROW:
                highlightOption(getPreviousOptionIndex(highlightedIndex, options));
                break;
            case KEY_CODES.ENTER:
                onOptionSelected(options[highlightedIndex], highlightedIndex);
                break;
        }
    };
    return (React.createElement("div", { className: "dse-select" },
        React.createElement("button", { "data-testid": "DseSelectButton", onKeyDown: onButtonKeyDown, "aria-controls": "dse-select-list", "aria-haspopup": true, "aria-expanded": isOpen ? true : undefined, ref: labelRef, className: "dse-select__label", onClick: onLabelClick },
            React.createElement(Text, null, selectedIndex === null ? label : options[selectedIndex].label),
            React.createElement("svg", { className: `dse-select__caret ${isOpen ? "dse-select__caret--open" : "dse-select__caret--closed"}`, width: "1rem", height: "1rem", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, viewBox: "0 0 24 24", stroke: "currentColor" },
                React.createElement("path", { d: "M19 9l-7 7-7-7" }))),
        React.createElement("ul", { role: "menu", id: "dse-select-list", style: { top: overlayTop }, className: `dse-select__overlay ${isOpen ? "dse-select__overlay--open" : ""}` }, options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;
            const isHighlighted = highlightedIndex === optionIndex;
            const ref = optionRefs[optionIndex];
            const renderOptionProps = {
                option,
                isSelected,
                getOptionRecommendedProps: (overrideProps = {}) => {
                    return {
                        ref,
                        role: "menuitemradio",
                        "aria-label": option.label,
                        "aria-checked": isSelected ? true : undefined,
                        onKeyDown: onOptionKeyDown,
                        tabIndex: isHighlighted ? -1 : 0,
                        onMouseEnter: () => highlightOption(optionIndex),
                        onMouseLeave: () => highlightOption(null),
                        className: `dse-select__option ${isSelected && "dse-select__option--selected"} ${isHighlighted && "dse-select__option--highlighted"}`,
                        onClick: () => onOptionSelected(option, optionIndex),
                        key: option.value,
                        ...overrideProps,
                    };
                },
            };
            if (renderOption)
                return renderOption(renderOptionProps);
            return (React.createElement("li", { ...renderOptionProps.getOptionRecommendedProps() },
                React.createElement(Text, null, option.label),
                isSelected && (React.createElement("svg", { width: "1rem", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" },
                    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.5 12.75l6 6 9-13.5" })))));
        }))));
}; //test comments for git

export { Select as default };
//# sourceMappingURL=Select.js.map
