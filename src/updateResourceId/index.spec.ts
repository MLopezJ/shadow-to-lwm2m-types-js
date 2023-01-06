import { getURN } from "./index";
//TODO: use node modeles on Jest
describe("Update resource id", () => {
  it.each([
    ["3303", "3303:1.1"],
    ["3", "3"],
    ["4", "3"],
    ["10256", ""],
    ["5", ""],
    ["3304", ""],
    ["6", "6"],
    ["1", "1"],
    ["3323", ""],
    ["3347", ""],
    ["3303", ""],
  ])(
    "Should check if the full URN of resource %s is %s ",
    async (value, expected) => {
      expect(await getURN(value)).toBe(expected);
    }
  );
});
