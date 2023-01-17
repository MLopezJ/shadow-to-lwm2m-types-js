import { getURN } from "./utils";

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
