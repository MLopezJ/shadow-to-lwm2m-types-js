import { getResourceId } from "./getResourceId";

describe("getResourceId", () => {
  it.each([
    ["Temperature", "3303"],
    ["ECID-Signal Measurement Information", "10256"],
    ["Push button", "3347"],
  ])("given the resource name should return the id", (name, id) =>  expect(getResourceId(name as any)).toBe(id));

  it("should return undefined when name of the resource does not exist", () => {
    const value = "new object name";
    const expected = undefined;
    expect(getResourceId(value as any)).toBe(expected);
  });
});
