import { main, steps } from "./index";
import { LwM2MIds } from "./input/LwM2M-ids";
import jsonSchema from "../node_modules/@nordicsemiconductor/lwm2m-types/LwM2MDocument.schema.json"; // TODO: export json schema from lib

describe("main", () => {
  it("should test shadow transformation", async () => {
    const input = {
      state: {
        reported: {
          Temperature: {
            "0": {
              "Application Type": "",
              "Fractional Timestamp": {
                noValue: true,
              },
              "Max Measured Value": "23.51",
              "Max Range Value": "85.0",
              "Measurement Quality Indicator": {
                noValue: true,
              },
              "Measurement Quality Level": {
                noValue: true,
              },
              "Min Measured Value": "23.51",
              "Min Range Value": "-40.0",
              "Reset Min and Max Measured Values": {
                noValue: true,
              },
              "Sensor Units": "Celsius degrees",
              "Sensor Value": "24.57",
              Timestamp: "2022-10-07T13:33:22Z",
            },
          },
          "ECID-Signal Measurement Information": {
            "1": {
              physCellId: "425",
              ECGI: "0",
              arfcnEUTRA: "300",
              "rsrp-Result": "-115",
              "rsrq-Result": "-12",
              "ue-RxTxTimeDiff": "23",
            },
          },
        },
      },
    };

    const expected = {
      "3303:1.1": [
        {
          "5518": 2022,
          "5601": 23.51,
          "5602": 23.51,
          "5603": -40,
          "5604": 85,
          "5700": 24.57,
          "5701": "Celsius degrees",
        },
      ],
      "10256": [
        {
          "0": 425,
          "1": 0,
          "2": 300,
          "3": -115,
          "4": -12,
          "5": 23,
        },
      ],
    };

    const result = await main(input, LwM2MIds);
    expect(Object.keys(input.state.reported).length).toEqual(
      Object.keys(result).length
    );
    expect(result).toStrictEqual(expected);
    expect(result).not.toHaveProperty("ECID-Signal Measurement Information");
    expect(result).toHaveProperty("10256");
  });

  it("should test process with different inputs", async () => {
    const shadow = {
      state: {
        reported: {
          Temperature: {
            "0": {
              "Sensor Units": "Celsius degrees",
              "Sensor Value": "24.57",
            },
          },
        },
      },
    };

    const anotherShadow = {
      state: {
        reported: {
          "new name here": {
            "0": {
              hello: "Celsius degrees",
              hi: "24.57",
            },
          },
        },
      },
    };

    const anotherIdsObject = {
      "new name here": {
        id: "3303",
        name: "new name here",
        properties: {
          hi: "5700",
          hello: "5701",
        },
      },
    };

    const expected = {
      "3303:1.1": [
        {
          "5700": 24.57,
          "5701": "Celsius degrees",
        },
      ],
    };

    expect(await main(shadow, LwM2MIds)).toStrictEqual(expected);
    expect(await main(anotherShadow, anotherIdsObject as any)).toStrictEqual(
      expected
    );
  });
});

describe("steps", () => {
  it("should test methods are called with expected params", async () => {
    const shadow = {
      state: {
        reported: {
          Temperature: {
            "0": {
              "Sensor Units": "Celsius degrees",
              "Sensor Value": "24.57",
              "Fractional Timestamp": {
                noValue: true,
              },
            },
          },
        },
      },
    };

    const resultStep1 = {
      Temperature: [
        {
          "Sensor Units": "Celsius degrees",
          "Sensor Value": "24.57",
          "Fractional Timestamp": {
            noValue: true,
          },
        },
      ],
    };

    const resultStep2 = {
      Temperature: [
        { "Sensor Units": "Celsius degrees", "Sensor Value": "24.57" },
      ],
    };

    const resultStep3 = {
      "3303": [{ "5700": "24.57", "5701": "Celsius degrees" }],
    };

    const resultStep4 = {
      "3303:1.1": [{ "5700": "24.57", "5701": "Celsius degrees" }],
    };

    // step 1
    const fromMapToPlainObject = jest
      .fn()
      .mockImplementation(() => resultStep1);

    // step 2
    const removeNotProvidedValues = jest
      .fn()
      .mockImplementation(() => resultStep2);

    // step 3
    const nameToId = jest.fn().mockImplementation(() => resultStep3);

    // step 4
    const fromIdToUrn = jest.fn().mockImplementation(() => resultStep4);

    // step 5
    const sc = jest.fn();

    await steps(
      shadow.state.reported,
      LwM2MIds,
      jsonSchema,
      fromMapToPlainObject,
      removeNotProvidedValues,
      nameToId,
      fromIdToUrn,
      sc
    );

    expect(fromMapToPlainObject).toHaveBeenCalledWith(shadow.state.reported); // step 1
    expect(removeNotProvidedValues).toHaveBeenCalledWith(resultStep1); // step 2
    expect(nameToId).toHaveBeenCalledWith(resultStep2, LwM2MIds); // step 3
    expect(fromIdToUrn).toHaveBeenCalledWith(resultStep3); // step 4
    expect(sc).toHaveBeenCalledWith(jsonSchema, resultStep4); // step 5
  });
});
