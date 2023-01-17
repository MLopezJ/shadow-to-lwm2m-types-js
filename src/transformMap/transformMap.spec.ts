//import { transformMap } from "./transformMap";
import { LwM2MIds } from "../input/LwM2M-ids";
import {main} from "./test"

describe("transformMap()", () => {
  it.only("should transform a map data struct to plain object", async () => {
    const value = {
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
    const expected = {
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

    expect(await main(value, LwM2MIds)).toStrictEqual(expected);
    expect(Object.keys(value).length).toEqual(
      Object.keys(main(value, LwM2MIds)).length
    );
  });
  it("should transform map taking in consideration the json schema definition", () => {
    // Location is an object by schema definition
    const value = {
      Location: {
        "0": {
          Altitude: "0.0",
          Latitude: "0.0",
          Longitude: "0.0",
          Radius: "0.0",
          Speed: "0.0",
          Timestamp: "1970-01-01T00:00:00Z",
          Velocity: "",
        },
      },
    };
    const expected = {
      "6": {
        "0": "0.0",
        "1": "0.0",
        "2": "0.0",
        "3": "0.0",
        "5": "1970-01-01T00:00:00Z",
        "6": "0.0",
      },
    };
    expect(main(value, LwM2MIds)).toStrictEqual(expected);
  });
  it("should transform map into array", () => {
    // Pressure is an array by the schema definition
    const value = {
      Pressure: {
        "0": {
          "Application Type": "",
          "Max Measured Value": "98.236",
          "Max Range Value": "110.0",
          "Min Measured Value": "98.236",
          "Min Range Value": "30.0",
          "Sensor Units": "kPa",
          "Sensor Value": "98.226",
          Timestamp: "2022-10-07T13:33:22Z",
        },
      },
    };
    const expected = {
      Pressure: [
        {
          "Application Type": "",
          "Max Measured Value": "98.236",
          "Max Range Value": "110.0",
          "Min Measured Value": "98.236",
          "Min Range Value": "30.0",
          "Sensor Units": "kPa",
          "Sensor Value": "98.226",
          Timestamp: "2022-10-07T13:33:22Z",
        },
      ],
    };

    expect(main(value, LwM2MIds)).toStrictEqual(expected);
  });

  it("should transform map into array", () => {
    // Pressure is an array by the schema definition
    const value = {
      "ECID-Signal Measurement Information": {
        "0": {
          physCellId: "247",
          ECGI: "0",
          arfcnEUTRA: "6400",
          "rsrp-Result": "-96",
          "rsrq-Result": "-12",
          "ue-RxTxTimeDiff": "0",
        },
        "1": {
          physCellId: "425",
          ECGI: "0",
          arfcnEUTRA: "300",
          "rsrp-Result": "-115",
          "rsrq-Result": "-12",
          "ue-RxTxTimeDiff": "23",
        },
        "2": {
          physCellId: "195",
          ECGI: "0",
          arfcnEUTRA: "300",
          "rsrp-Result": "-119",
          "rsrq-Result": "-16",
          "ue-RxTxTimeDiff": "23",
        },
      },
    };

    const expected = {
      "ECID-Signal Measurement Information": [
        {
          physCellId: "247",
          ECGI: "0",
          arfcnEUTRA: "6400",
          "rsrp-Result": "-96",
          "rsrq-Result": "-12",
          "ue-RxTxTimeDiff": "0",
        },
        {
          physCellId: "425",
          ECGI: "0",
          arfcnEUTRA: "300",
          "rsrp-Result": "-115",
          "rsrq-Result": "-12",
          "ue-RxTxTimeDiff": "23",
        },
        {
          physCellId: "195",
          ECGI: "0",
          arfcnEUTRA: "300",
          "rsrp-Result": "-119",
          "rsrq-Result": "-16",
          "ue-RxTxTimeDiff": "23",
        },
      ],
    };

    expect(main(value, LwM2MIds)).toStrictEqual(expected);
  });
});
