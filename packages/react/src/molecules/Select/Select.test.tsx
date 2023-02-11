import React from "react";

import Select from "./Select";

import { render, fireEvent } from "@testing-library/react";

const options = [
  {
    label: "Sweet pink",
    value: "pink",
  },
  {
    label: "bitter green",
    value: "green",
  },
  {
    label: "sad dark",
    value: "dark",
  },
];
it("renders all options added to it", () => {
  const { getAllByRole, getByTestId } = render(<Select options={options} />);

  const button = getByTestId("DseSelectButton");
  fireEvent.click(button);

  expect(getAllByRole("menuitemradio")).toHaveLength(options.length);
});

it("renders options using custom renderOption method if passed as prop", () => {
  const { getAllByTestId, getByTestId } = render(
    <Select
      options={options}
      renderOption={({ option, getOptionRecommendedProps }) => (
        <li {...getOptionRecommendedProps()} data-testid="CustomRenderOption">
          {option.label}
        </li>
      )}
    />
  );

  const button = getByTestId("DseSelectButton");
  fireEvent.click(button);

  const customLi = getAllByTestId("CustomRenderOption");

  expect(customLi).toHaveLength(options.length);
});

it("calls the onOptionSelected prop with selected option and its index if passed", () => {
  const onOptionSelectedMock = jest.fn();
  const { getByTestId, getAllByRole } = render(
    <Select options={options} onOptionSelected={onOptionSelectedMock} />
  );

  const button = getByTestId("DseSelectButton");
  fireEvent.click(button);

  const [firstListItem] = getAllByRole("menuitemradio");

  fireEvent.click(firstListItem);

  expect(onOptionSelectedMock).toHaveBeenCalledWith(options[0], 0);
});

it("the button label changes to the selected option label", () => {
  const { getByTestId, getAllByRole } = render(<Select options={options} />);

  const button = getByTestId("DseSelectButton");
  fireEvent.click(button);

  const [firstListItem] = getAllByRole("menuitemradio");

  fireEvent.click(firstListItem);

  expect(button).toHaveTextContent(options[0].label);
});

it("snapshot of the selected option state", () => {
  const { getByTestId, getAllByRole, asFragment } = render(
    <Select options={options} />
  );

  const button = getByTestId("DseSelectButton");
  fireEvent.click(button);

  const [firstListItem] = getAllByRole("menuitemradio");
  fireEvent.click(firstListItem);

  expect(asFragment()).toMatchSnapshot();
});

it("snapshot of the base state", () => {
  const { asFragment } = render(<Select options={options} />);

  expect(asFragment()).toMatchSnapshot();
});

it("snapshot of the options menu open state", () => {
  const { asFragment, getByTestId } = render(<Select options={options} />);

  const button = getByTestId("DseSelectButton");
  fireEvent.click(button);

  expect(asFragment()).toMatchSnapshot();
});

it("can customize select label", () => {
  const customLabel = "myCustomLabel";
  const { getByTestId } = render(
    <Select options={options} label={customLabel} />
  );

  const button = getByTestId("DseSelectButton");

  expect(button).toHaveTextContent(customLabel);
});

