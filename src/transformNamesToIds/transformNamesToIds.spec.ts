import { Temperature } from "../shadow/LwM2M-ids/Temperature";
import { getLwM2MProps, pairValue, transformNamesToIds } from "./transformNamesToIds";

describe("combine", () => {
    it("given a 'clean' plain object shadow it should transform names to equivalent ids", () => {
        const input = {
            "Temperature": [
              {
                "Max Measured Value": "23.51",
                "Max Range Value": "85.0",
                "Min Measured Value": "23.51",
                "Min Range Value": "-40.0",
                "Sensor Units": "Celsius degrees",
                "Sensor Value": "24.57",
                "Timestamp": "2022-10-07T13:33:22Z"
              }
            ]
          }
        const expected = {
            "3303": [
              {
                "5518": "2022-10-07T13:33:22Z",//"1665149633",
                "5601": "23.51",
                "5602": "23.51",
                "5603": "-40.0",
                "5604": "85.0",
                "5700": "24.57",
                "5701": "Celsius degrees"
              }
            ]
          }
        expect(transformNamesToIds(input)).toStrictEqual(expected)
    }),

    it.only("Should ignore not recognized values", () => {
        const input = {
            "Temperature": [
              {
                "Max Measured Value": "23.51",
                "Max Range Value": "85.0",
                "Min Measured Value": "23.51",
                "Min Range Value": "-40.0",
                "Sensor Units": "Celsius degrees",
                "Sensor Value": "24.57",
                "Timestamp": "2022-10-07T13:33:22Z"
              },
              {
                "Max Measured Value": "5523.51",
                "Max Range Value": "5585.0",
                "Min Measured Value": "5523.51",
                "not recognized value": "-5540.0", // Min Range Value key was updated
                "Sensor Units": "Celsius degrees",
                "Sensor Value": "5524.57",
                "Timestamp": "2022-10-07T13:33:22Z"
              }
            ], 
            "not recognized value": [
                {
                  "Max Measured Value": "1123.51",
                  "Max Range Value": "1185.0",
                  "Min Measured Value": "1123.51",
                  "Min Range Value": "-110.0",
                  "Sensor Units": "Celsius degrees",
                  "Sensor Value": "1124.57",
                  "Timestamp": "2022-10-07T13:33:22Z"
                }
              ]
          }
        const expected = {
            "3303": [
              {
                "5518": "2022-10-07T13:33:22Z",
                "5601": "23.51",
                "5602": "23.51",
                "5603": "-40.0", // Min Range Value is here
                "5604": "85.0",
                "5700": "24.57",
                "5701": "Celsius degrees"
              },
              // but not here
              {
                "5518": "2022-10-07T13:33:22Z",
                "5601": "23.51",
                "5602": "23.51",
                "5604": "85.0",
                "5700": "24.57",
                "5701": "Celsius degrees"
              }
            ]
          }
        expect(transformNamesToIds(input)).toBe(expected)
    })
})

describe("getLwM2MProps", () => {
  it("Should return the object props given the LwM2M resource name", () => {
    const input = "Temperature";
    const expected = {
      "Application Type": "5750",
      "Fractional Timestamp": "6050",
      "Max Measured Value": "5602",
      "Max Range Value": "5604",
      "Measurement Quality Indicator": "6042",
      "Measurement Quality Level": "6049",
      "Min Measured Value": "5601",
      "Min Range Value": "5603",
      "Reset Min and Max Measured Values": "5605",
      "Sensor Units": "5701",
      "Sensor Value": "5700",
      Timestamp: "5518",
    };
    expect(getLwM2MProps(input)).toStrictEqual(expected);
  });

  it("Should return undefined when the given LwM2M resource name is not correct", () => {
    const input = "Temperature not correct";
    const expected = undefined;
    expect(getLwM2MProps(input)).toStrictEqual(expected);
  });
});

describe("pairValue", () => {
  it("Should return a new object of id and value given the name of the prop", () => {
    const propName = "Sensor Units";
    const propValue = "Celsius degrees"
    const expected = {
      "5701": "Celsius degrees"
    };
    expect(pairValue(propName, propValue, Temperature.properties)).toStrictEqual(expected);
  });

  it("Should return undefined when given name of the prop is not found in the LwM2M object", () => {
    const propName = "not existed prop name";
    const propValue = "Celsius degrees"
    expect(pairValue(propName, propValue, Temperature.properties)).toBe(undefined);
  });
});
