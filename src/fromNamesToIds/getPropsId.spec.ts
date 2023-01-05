import { getPropId } from "./getPropsId";

describe("getPropId", () => {
  it("given the property name should return the id of the prop", () => {
    const propName = "Application Type";
    const LwM2MProps = {
      "Application Type": "5750",
      "Fractional Timestamp": "6050",
      "Max Measured Value": "5602",
    };
    const propId = "5750";
    expect(getPropId(propName, LwM2MProps)).toBe(propId);
  });

  it("should return undefined when name of the prop does not exist", () => {
    const propName = "new prop name";
    const LwM2MProps = {
      "Application Type": "5750",
      "Fractional Timestamp": "6050",
      "Max Measured Value": "5602",
    };
    const propId = undefined;
    expect(getPropId(propName, LwM2MProps)).toBe(propId);
  });
});
