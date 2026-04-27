import { expect, test } from "bun:test";

import { createPlaceholderMessage } from "./index";

test("exports a placeholder library entrypoint", () => {
  expect(createPlaceholderMessage()).toBe("Template library placeholder.");
});
