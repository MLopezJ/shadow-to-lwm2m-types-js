import {
  getURN,
  getResourceType,
  isNotProvidedValue,
  castData,
  getPropType,
  getResourceId,
  getPropId,
} from "./utils";

describe("getURN", () => {
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
});

describe("getResourceType", () => {
  it.each([
    ["3303:1.1", "array"],
    ["3:1.2@1.1", "object"],
    ["4:1.3@1.1", "object"],
    ["5:1.1@1.1", "object"],
    ["6", "object"],
    ["3323:1.1", "array"],
    ["3347:1.1", "array"],
    ["1:1.2@1.2", "array"],
  ])("Should return resource (%s) type: %s ", (value, expected) => {
    expect(getResourceType(value)).toBe(expected);
  });
});

describe("isNotProvidedValue", () => {
  it.each([
    [{ noValue: true }, true],
    [{ prop: "" }, false],
    [{ prop: {} }, false],
    [{ SMNC: "1" }, false],
    [{ "Router IP Addresses": {} }, false],
    [{}, true],
    ["value", false],
  ])("Should return resource (%s) type: %s ", (value, expected) => {
    expect(isNotProvidedValue(value)).toBe(expected);
  });
});

describe("castData", () => {
  it.each([
    ["false", "integer", 0],
    ["true", "integer", 1],
    ["10", "integer", 10],
    ["10", "number", 10],
    ["true", "boolean", true],
    ["false", "boolean", false],
    ["hi", "string", "hi"],
    //["[1,2,3]","array", [1,2,3]] // FIX ME
  ])(
    "Should cast data. Value: %s Type: %s Result: %s ",
    (value, type, expected) => {
      expect(castData(type, value)).toBe(expected);
    }
  );
});

describe("getPropType", () => {
  it.each([
    ["3:1.2@1.1", "0", "string"],
    ["5:1.1@1.1", "3", "integer"],
    ["3303:1.1", "5603", "number"],
    ["4:1.3@1.1", "1", "array"],
  ])(
    "Should return type from Resource: (%s) Prop: %s ",
    (resourceUrn, propId, expected) => {
      expect(getPropType(resourceUrn, propId)).toBe(expected);
    }
  );
});

describe("getPropType", () => {
  it.each([
    ["3:1.2@1.1", "0", "string"],
    ["5:1.1@1.1", "3", "integer"],
    ["3303:1.1", "5603", "number"],
    ["4:1.3@1.1", "1", "array"],
  ])(
    "Should return type from Resource: (%s) Prop: %s ",
    (resourceUrn, propId, expected) => {
      expect(getPropType(resourceUrn, propId)).toBe(expected);
    }
  );
});

describe("getResourceId", () => {
  it.each([
    ["Connectivity Monitoring", "4"],
    ["Device", "3"],
    ["Humidity", "3304"],
    ["Temperature", "3303"],
  ])("Should return id from Resource. (%s) should be %s ", (name, expected) => {
    expect(getResourceId(name)).toBe(expected);
  });
});

describe("getPropId", () => {
  it.each([
    ["Connectivity Monitoring", "LAC", "12"],
    ["Device", "Factory Reset", "5"],
    ["Humidity", "Fractional Timestamp", "6050"],
    ["Temperature", "Min Range Value", "5603"],
  ])("Should return id from prop. Resource %s, Prop %s = %s ", (resourceName,propName, expected) => {
    expect(getPropId(resourceName, propName)).toBe(expected);
  });
});
