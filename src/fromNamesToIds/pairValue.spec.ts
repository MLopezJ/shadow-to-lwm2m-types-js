import { Temperature } from "../shadow/LwM2M-ids/Temperature";
import { pairValue } from "./pairValue";

describe("pairValue", () => {
  it("Should construct a new object with the id of prop as the key instead of the name", () => {
    const name = "Sensor Units";
    const value = "Celsius degrees";
    const expected = {
      "5701": "Celsius degrees",
    };
    expect(pairValue(name, value, Temperature.properties)).toStrictEqual(
      expected
    );
  });

  it("Should return undefined when given name of the prop is not found in the LwM2M object", () => {
    const propName = "not existed prop name";
    const propValue = "Celsius degrees";
    expect(pairValue(propName, propValue, Temperature.properties)).toBe(
      undefined
    );
  });
});
