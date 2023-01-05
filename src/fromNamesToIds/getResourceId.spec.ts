import { getResourceId } from "./getResourceId";

describe("getResourceId", () => {
  it("given the resource name should return the id", () => {
    const value = "Temperature";
    const expected = "3303";
    expect(getResourceId(value)).toBe(expected);
  });

  it("should return undefined when name of the resource does not exist", () => {
    const value = "new object name";
    const expected = undefined;
    expect(getResourceId(value as any)).toBe(expected);
  });
});
