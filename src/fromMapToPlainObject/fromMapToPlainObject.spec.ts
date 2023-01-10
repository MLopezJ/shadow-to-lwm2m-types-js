import type { shadowObject } from "../cleanShadow/removeNotProvidedValues";
import { fromMapToPlainObject, plainObject } from "./fromMapToPlainObject";

describe("fromMapToPlainObject()", () => {
  it("should transform a map data struct to plain object", () => {
    const value: shadowObject = {
      "Connectivity Monitoring": {
        "0": {
          "Radio Signal Strength": "-96",
          LAC: "30401",
          "Available Network Bearer": {
            "0": "6",
            "1": "7",
          },
          "IP Addresses": {
            "0": "10.160.225.39",
          },
          "Router IP Addresses": {},
          "Link Quality": "0",
          altitude: {
            noValue: true,
          },
        },
      },
      "Firmware Update": {
        "0": {
          "Firmware Update Protocol Support": {},
          "Firmware Update Delivery Method": "2",
          Package: {
            noValue: true,
          },
          "Package URI": "",
        },
        "1": {
          "Firmware Update Protocol Support": {},
          "Firmware Update Delivery Method": "4",
          Package: {
            noValue: true,
          },
          "Package URI": "",
        },
      },
    };
    const expected: plainObject = {
      "Connectivity Monitoring": [
        {
          "Radio Signal Strength": "-96",
          LAC: "30401",
          "Available Network Bearer": ["6", "7"],
          "IP Addresses": ["10.160.225.39"],
          "Router IP Addresses": {},
          "Link Quality": "0",
          altitude: {
            noValue: true,
          },
        },
      ],

      "Firmware Update": [
        {
          "Firmware Update Protocol Support": {},
          "Firmware Update Delivery Method": "2",
          Package: {
            noValue: true,
          },
          "Package URI": "",
        },
        {
          "Firmware Update Protocol Support": {},
          "Firmware Update Delivery Method": "4",
          Package: {
            noValue: true,
          },
          "Package URI": "",
        },
      ],
    };

    expect(fromMapToPlainObject(value)).toStrictEqual(expected);
    expect(Object.keys(value).length).toEqual(Object.keys(fromMapToPlainObject(value)).length)
  });
});
