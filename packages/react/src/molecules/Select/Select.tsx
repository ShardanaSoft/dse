import React, {
  createRef,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

import Text from "../../atoms/Text";
import "@ds.e/scss/lib/Select.css";
interface SelectOption {
  label: string;
  value: string;
}
interface RenderOptionProps {
  isSelected: boolean;
  option: SelectOption;
  getOptionRecommendedProps: (overrideProps?: Object) => Object;
}

interface SelectProps {
  label?: string;
  options?: SelectOption[];
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
  renderOption?: (props: RenderOptionProps) => React.ReactNode;
}

const getNextOptionIndex = (
  currentIndex: number | null,
  options: Array<SelectOption>
) => {
  if (currentIndex === null) return 0;

  if (currentIndex === options.length - 1) return 0;

  return currentIndex + 1;
};

const getPreviousOptionIndex = (
  currentIndex: number | null,
  options: Array<SelectOption>
) => {
  if (currentIndex === null) return 0;

  if (currentIndex === 0) return options.length - 1;

  return currentIndex - 1;
};

const Select: React.FC<SelectProps> = ({
  onOptionSelected: handler,
  label = "Select an option",
  options = [],
  renderOption,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const labelRef = useRef<HTMLButtonElement>(null);
  const [optionRefs, setOptionRefs] = useState<
    React.RefObject<HTMLLIElement>[]
  >([]);
  const [overlayTop, setOverlayTop] = useState<number>(0);

  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
    if (handler) handler(option, optionIndex);

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

  const highlightOption = (optionIndex: number | null) => {
    setHighlightedIndex(optionIndex);
  };

  const onButtonKeyDown: KeyboardEventHandler = (event) => {
    event.preventDefault();

    console.log("button keydown", event.key);
    optionRefs[0].current?.focus();
    if (
      [KEY_CODES.DOWN_ARROW, KEY_CODES.ENTER, KEY_CODES.SPACE].includes(
        event.key
      )
    ) {
      if (!isOpen) {
        setIsOpen(true);

        highlightOption(0);
      }
    }
  };

  useEffect(() => {
    setOptionRefs(options.map((_) => createRef<HTMLLIElement>()));
  }, [options.length]);

  useEffect(() => {
    if (highlightedIndex !== null && isOpen) {
      const ref = optionRefs[highlightedIndex];

      if (ref && ref.current) ref.current.focus();
    }
  }, [isOpen, highlightedIndex]);

  const onOptionKeyDown: KeyboardEventHandler = (event) => {
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
        onOptionSelected(options[highlightedIndex!], highlightedIndex!);
        break;
    }
  };

  return (
    <div className="dse-select">
      <button
        data-testid="DseSelectButton"
        onKeyDown={onButtonKeyDown}
        aria-controls="dse-select-list"
        aria-haspopup={true}
        aria-expanded={isOpen ? true : undefined}
        ref={labelRef}
        className="dse-select__label"
        onClick={onLabelClick}
      >
        <Text>
          {selectedIndex === null ? label : options[selectedIndex].label}
        </Text>
        <svg
          className={`dse-select__caret ${
            isOpen ? "dse-select__caret--open" : "dse-select__caret--closed"
          }`}
          width="1rem"
          height="1rem"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {
        <ul
          role={"menu"}
          id="dse-select-list"
          style={{ top: overlayTop }}
          className={`dse-select__overlay ${
            isOpen ? "dse-select__overlay--open" : ""
          }`}
        >
          {options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;
            const isHighlighted = highlightedIndex === optionIndex;

            const ref = optionRefs[optionIndex];

            const renderOptionProps: RenderOptionProps = {
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
                  className: `dse-select__option ${
                    isSelected && "dse-select__option--selected"
                  } ${isHighlighted && "dse-select__option--highlighted"}`,
                  onClick: () => onOptionSelected(option, optionIndex),
                  key: option.value,

                  ...overrideProps,
                };
              },
            };

            if (renderOption) return renderOption(renderOptionProps);

            return (
              <li {...renderOptionProps.getOptionRecommendedProps()}>
                <Text>{option.label}</Text>
                {isSelected && (
                  <svg
                    width={"1rem"}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
};

export default Select;

