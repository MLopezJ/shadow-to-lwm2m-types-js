import { ShadowWithoutNotProvidedValues } from "../cleanShadow/removeNotProvidedValues";
import { nameToId, ShadowWithIds } from "./nameToId";
import { LwM2MIds } from "../shadow/LwM2M-ids";

describe("combine", () => {
  it("given a 'clean' plain object shadow it should replace names with equivalent id", () => {
    const input: ShadowWithoutNotProvidedValues = {
      Temperature: [
        {
          "Max Measured Value": "23.51",
          "Max Range Value": "85.0",
          "Min Measured Value": "23.51",
          "Min Range Value": "-40.0",
          "Sensor Units": "Celsius degrees",
          "Sensor Value": "24.57",
          Timestamp: "2022-10-07T13:33:22Z",
        },
      ],
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

    const expected: ShadowWithIds = {
      "3303": [
        {
          "5518": "2022-10-07T13:33:22Z", //"1665149633",
          "5601": "23.51",
          "5602": "23.51",
          "5603": "-40.0",
          "5604": "85.0",
          "5700": "24.57",
          "5701": "Celsius degrees",
        },
      ],
      "4": [
        {
          "9": "1",
          "1": ["6", "7"],
        },
      ],
      "10256": [
        { "0": "247", "1": "0" },
        { "0": "425", "1": "0" },
        { "0": "195", "1": "0" },
      ],
    };
    expect(nameToId(input, LwM2MIds)).toStrictEqual(expected);
  }),
    it("Should ignore not recognized values", () => {
      const input: ShadowWithoutNotProvidedValues = {
        Temperature: [
          {
            "Max Measured Value": "23.51",
            "Max Range Value": "85.0",
            "Min Measured Value": "23.51",
            "Min Range Value": "-40.0",
            "Sensor Units": "Celsius degrees",
            "Sensor Value": "24.57",
            Timestamp: "2022-10-07T13:33:22Z",
          },
          {
            "Max Measured Value": "5523.51",
            "Max Range Value": "5585.0",
            "Min Measured Value": "5523.51",
            "not recognized value": "-5540.0", // Min Range Value key was updated
            "Sensor Units": "Celsius degrees",
            "Sensor Value": "5524.57",
            Timestamp: "2022-10-07T13:33:22Z",
          },
        ],
        "not recognized value": [
          // Resource name is not recognized
          {
            "Max Measured Value": "1123.51",
            "Max Range Value": "1185.0",
            "Min Measured Value": "1123.51",
            "Min Range Value": "-110.0",
            "Sensor Units": "Celsius degrees",
            "Sensor Value": "1124.57",
            Timestamp: "2022-10-07T13:33:22Z",
          },
        ],
      };

      const expected: ShadowWithIds = {
        "3303": [
          {
            "5518": "2022-10-07T13:33:22Z",
            "5601": "23.51",
            "5602": "23.51",
            "5603": "-40.0", // Min Range Value is here
            "5604": "85.0",
            "5700": "24.57",
            "5701": "Celsius degrees",
          },
          // but not here
          {
            "5518": "2022-10-07T13:33:22Z",
            "5601": "5523.51",
            "5602": "5523.51",
            "5604": "5585.0",
            "5700": "5524.57",
            "5701": "Celsius degrees",
          },
        ],
      };
      expect(nameToId(input, LwM2MIds)).toStrictEqual(expected);
    });
});
