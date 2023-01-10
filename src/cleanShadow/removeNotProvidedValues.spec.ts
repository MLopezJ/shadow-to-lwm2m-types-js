import {
  checkProps,
  props,
  PropsWithoutNotProvidedValues,
  removeNotProvidedValues,
} from "./removeNotProvidedValues";

describe("removeNotProvidedValues", () => {
  it("should iterate object and remove not provided props", () => {
    const value = {
      "Connectivity Monitoring": [
        {
          SMNC: "1",
          "Application Type": "",
          "Available Network Bearer": ["6", "7"],
          "Router IP Addresses": {},
        },
      ],
      "ECID-Signal Measurement Information": [
        {
          physCellId: "247",
          ECGI: "0",
          "Last Bootstrapped": {
            noValue: true,
          },
        },
        {
          physCellId: "425",
          ECGI: "0",
          "Last Bootstrapped": {
            noValue: true,
          },
        },
        {
          physCellId: "195",
          ECGI: "0",
          "Last Bootstrapped": {
            noValue: true,
          },
        },
      ],
    };

    const expected = {
      "Connectivity Monitoring": [
        {
          SMNC: "1",
          "Available Network Bearer": ["6", "7"],
        },
      ],
      "ECID-Signal Measurement Information": [
        {
          physCellId: "247",
          ECGI: "0",
        },
        {
          physCellId: "425",
          ECGI: "0",
        },
        {
          physCellId: "195",
          ECGI: "0",
        },
      ],
    };

    const result = removeNotProvidedValues(value);

    expect(result).toStrictEqual(expected);
    expect(Object.keys(value).length).toEqual(Object.keys(result).length);
  });
});

describe("checkProps", () => {
  it('should remove properties when its value is cataloged as "not provided"', () => {
    const object: props = {
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

    const newObject: PropsWithoutNotProvidedValues = {
      "Available Network Bearer": {
        "0": "6",
        "1": "7",
      },
      "Max Measured Value": "23.51",
    };

    expect(checkProps(object)).toStrictEqual(newObject)

    expect(checkProps(object)).not.toHaveProperty("Fractional Timestamp");

    expect(checkProps(object)).not.toHaveProperty("Router IP Addresses");

    expect(checkProps(object)).not.toHaveProperty("Application Type");

    expect(checkProps(object)).toHaveProperty("Available Network Bearer");

    expect(checkProps(object)).toHaveProperty("Max Measured Value");
  });
});
