import { main } from "./index";
import coioteLwM2MJsonShcema from "./input/coioteLwM2MJsonShcema.schema.json";
import { LwM2MIds } from "./input/LwM2M-ids";

describe("main", () => {
  it("should test complete flow of process", async () => {
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

    
    const result = await main(input, coioteLwM2MJsonShcema,LwM2MIds )
    expect(Object.keys(input.state.reported).length).toEqual(
      Object.keys(result).length
    );
    expect(result).toStrictEqual(expected);
    expect(result).not.toHaveProperty("ECID-Signal Measurement Information");
    expect(result).toHaveProperty("10256");
  });
});
