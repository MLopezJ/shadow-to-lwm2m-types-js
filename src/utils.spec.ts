import { getURN, getResourceType, isNotProvidedValue } from "./utils";

describe("getURN", () => {
  it.each([
    ["3303", "3303:1.1"],
    ["3", "3:1.2@1.1"],
    ["4", "4:1.3@1.1"],
    ["10256", "10256"],
    ["5", "5:1.1@1.1"],
    ["3304", "3304:1.1"],
    ["6", "6"],
    ["1", "1:1.2@1.2"],
    ["3323", "3323:1.1"],
    ["3347", "3347:1.1"],
    ["3303", "3303:1.1"],
  ])(
    "Should check if the full URN of resource %s is %s ",
    async (value, expected) => {
      expect(await getURN(value)).toBe(expected);
    }
  );
});

describe("getResourceType", () => {
  it.each([
    ["3303:1.1", "array"],
    ["3:1.2@1.1", "object"],
    ["4:1.3@1.1", "object"],
    ["5:1.1@1.1", "object"],
    ["6", "object"],
    ["3323:1.1", "array"],
    ["3347:1.1", "array"],
    ["1:1.2@1.2", "array"],
  ])("Should return resource (%s) type: %s ", (value, expected) => {
    expect(getResourceType(value)).toBe(expected);
  });
});

describe("isNotProvidedValue", () => {
  it.each([
    [{ noValue: true }, true],
    [{ prop: "" }, false],
    [{ prop: {} }, false],
    [{ SMNC: "1" }, false],
    [{ "Router IP Addresses": {} }, false],
    [{}, true],
    ["value", false],
  ])("Should return resource (%s) type: %s ", (value, expected) => {
    expect(isNotProvidedValue(value)).toBe(expected);
  });
});
