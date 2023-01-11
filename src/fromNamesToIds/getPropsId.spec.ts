import { LwM2MIds } from "../shadow/LwM2M-ids";
import { getPropId, getPropsId } from "./getPropsId";
import { Properties } from "./nameToId";

describe("getPropsId", () => {
  it("given the props should return a new object with ids instead of names as keys of the object", () => {
    const props: Properties = [
      {
        "Max Measured Value": "23.51",
        "Max Range Value": "85.0",
        "Min Measured Value": "23.51",
        "Min Range Value": "-40.0",
        "Sensor Units": "Celsius degrees",
        "Sensor Value": "24.57",
        Timestamp: "2022-10-07T13:33:22Z",
      },
    ];
    const resourceName = "Temperature";
    const expected = [
      {
        "5518": "2022-10-07T13:33:22Z",
        "5601": "23.51",
        "5602": "23.51",
        "5603": "-40.0",
        "5604": "85.0",
        "5700": "24.57",
        "5701": "Celsius degrees",
      },
    ]
    expect(getPropsId(props, resourceName, LwM2MIds)).toStrictEqual(expected);
  });

  it("should ignore not recognized values", () => {
    const props: Properties = [
      {
        "Max Measured Value": "23.51",
        "Max Range Value": "85.0",
        "Min Measured Value": "23.51",
        "Min Range Value": "-40.0",
        "Sensor Units": "Celsius degrees",
        "Sensor Value": "24.57",
        Timestamp: "2022-10-07T13:33:22Z",
      },
    ];
    const resourceName = "not a LwM2M resource";
    expect(getPropsId(props, resourceName as any, LwM2MIds)).toStrictEqual([{}]);
  });
});

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
