import ReactDOMClient from "react-dom/client";
import React from "react";
import { Color, Margin, Select, Text } from "@navoxds.e/react";

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

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container!);

root.render(
  <>
    <Color hexCode="#18723add" width="xxl" height="lg" />
    <Margin>
      <Text size="sm">Text test</Text>
    </Margin>
    <Select
      options={options}
      label="Please select "
      // renderOption={({ option, getOptionRecommendedProps }) => (
      //   <p {...getOptionRecommendedProps()}>{option.label}</p>
      // )}
    />
  </>
);

