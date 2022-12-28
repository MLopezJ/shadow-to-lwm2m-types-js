import { getLwM2MProps } from "./getLwM2MProps";
import { Temperature } from "../shadow/LwM2M-ids/Temperature";

describe("getLwM2MProps", () => {
    it("Should return the object props given the LwM2M resource name", () => {
      const input = "Temperature";
      expect(getLwM2MProps(input)).toStrictEqual(Temperature.properties);
    });
  
    it("Should return undefined when the given LwM2M resource name is not correct", () => {
      const input = "Temperature not correct";
      const expected = undefined;
      expect(getLwM2MProps(input)).toStrictEqual(expected);
    });
  });
  