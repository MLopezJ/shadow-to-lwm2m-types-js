import { removeNotProvidedProp } from "./removeNotProvidedValues";

describe("removeNotProvidedProp", () => {
  it('should remove properties when its value is "{"noValue": true}"', () => {
    const object = {
      "Application Type": "",
      "Fractional Timestamp": {
        noValue: true,
      },
      "Max Measured Value": "23.51",
    };

    expect(removeNotProvidedProp(object)).not.toHaveProperty(
      "Fractional Timestamp"
    );

    expect(removeNotProvidedProp(object)).not.toHaveProperty(
      "Application Type"
    );

    expect(removeNotProvidedProp(object)).toHaveProperty("Max Measured Value");
  });
});
