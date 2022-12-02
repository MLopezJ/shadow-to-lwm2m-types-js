import { cleanShadow, receivedShadow } from "./cleanShadow";

describe("cleanShadow", () => {
  it("should transform shadow into plain object and remove its not usefull prop ", () => {
    const value: receivedShadow = {
      state: {
        reported: {
          "Connectivity Monitoring": {
            "0": {
              SMNC: "1",
              "Application Type": "",
              "Available Network Bearer": {
                "0": "6",
                "1": "7",
              },
              "Router IP Addresses": {},
            },
          },
          "ECID-Signal Measurement Information": {
            "0": {
              physCellId: "247",
              ECGI: "0",
              "Last Bootstrapped": {
                noValue: true,
              },
            },
            "1": {
              physCellId: "425",
              ECGI: "0",
              "Last Bootstrapped": {
                noValue: true,
              },
            },
            "2": {
              physCellId: "195",
              ECGI: "0",
              "Last Bootstrapped": {
                noValue: true,
              },
            },
          },
        },
      },
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

    expect(cleanShadow(value)).toStrictEqual(expected);
  });
});
