import { fromIdToUrn, getURN } from "./index";

describe("Update resource id", () => {
  it.each([
    ["3303", "3303:1.1"],
    ["3", "3:1.2@1.1"],
    ["4", "4:1.3@1.1"],
    ["10256", "10256"],
    ["5", "5:1.1@1.1"],
    ["3304", "3304:1.1"],
    ["6", "6"],
    ["1", "1:1.2@1.2"],
    ["3323", "3323:1.1"],
    ["3347", "3347:1.1"],
    ["3303", "3303:1.1"],
  ])(
    "Should check if the full URN of resource %s is %s ",
    async (value, expected) => {
      expect(await getURN(value)).toBe(expected);
    }
  );

  it("should iterate over the object and change the resource id with URN", async () => {
    const input = {
      "3": [
        {
          "0": "Nordic Semiconductor ASA",
          "1": "thingy91_nrf9160",
          "3": "0.0.0-development",
        },
      ],
      "6": [
        {
          "0": "0.0",
          "1": "0.0",
          "2": "0.0",
        },
      ],
    };

    const expected = {
      "3:1.2@1.1": [
        {
          "0": "Nordic Semiconductor ASA",
          "1": "thingy91_nrf9160",
          "3": "0.0.0-development",
        },
      ],
      "6": [
        {
          "0": "0.0",
          "1": "0.0",
          "2": "0.0",
        },
      ],
    };

    expect(await fromIdToUrn(input)).toStrictEqual(expected);
  });
});
