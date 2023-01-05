import { removeNotProvidedProp } from "./removeNotProvidedValues";

describe("removeNotProvidedProp", () => {
  it('should remove properties when its value is "{"noValue": true}"', () => {
    const object = {
      "Application Type": "",
      "Router IP Addresses": {},
      "Fractional Timestamp": {
        noValue: true,
      },
      "Available Network Bearer": {
        "0": "6",
        "1": "7",
      },
      "Max Measured Value": "23.51",
    };

    expect(removeNotProvidedProp(object)).not.toHaveProperty(
      "Fractional Timestamp"
    );

    expect(removeNotProvidedProp(object)).not.toHaveProperty(
      "Router IP Addresses"
    );

    expect(removeNotProvidedProp(object)).not.toHaveProperty(
      "Application Type"
    );

    expect(removeNotProvidedProp(object)).toHaveProperty(
      "Available Network Bearer"
    );

    expect(removeNotProvidedProp(object)).toHaveProperty("Max Measured Value");
  });
});
