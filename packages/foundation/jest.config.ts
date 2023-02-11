import type { Config } from "jest";

const config: Config = {
  roots: ["<rootDir>/src"],
  testRegex: "(/.*\\.test)\\.ts$",
};

export default config;

