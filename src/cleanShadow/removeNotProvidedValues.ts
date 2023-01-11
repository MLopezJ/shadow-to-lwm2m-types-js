import { PlainShadowObject, Props } from "../fromMapToPlainObject/fromMapToPlainObject";
import { propMap, value } from "../input/shadowType";
/**
 * {
 *  "Temperature": [
 *    {
 *      "Max Measured Value": "23.51",
 *      "Max Range Value": "85.0",
 *    }
 *  ]
 * }
 * 
 */
export type ShadowWithoutNotProvidedValues = Record<
  string,
  PropsWithoutNotProvidedValues[]
>;

/**
 * {
 *   "Max Measured Value": "23.51",
 *   "Max Range Value": "85.0",
 * }
 */
export type PropsWithoutNotProvidedValues = Record<
  string,
  string | propMap | string[]
>;

/**
 * Iterate object to remove not provided values
 */
export const removeNotProvidedValues = (
  inputValue: PlainShadowObject
): ShadowWithoutNotProvidedValues => {
  const shadow: ShadowWithoutNotProvidedValues = {};
  for (const key of Object.keys(inputValue)) {
    shadow[`${key}`] = inputValue[`${key}`]!.map((element) =>
      checkProps(element)
    );
  }
  return shadow;
};

/**
 * Remove property from shadow when its value is:
 *    No value --> {"noValue": true}
 *    Empty string --> {prop: ""}
 *    Empty object --> {prop: {}}
 */
export const checkProps = (object: Props): PropsWithoutNotProvidedValues => {
  return Object.keys(object)
    .filter((id) => {
      const prop: value = object[`${id}`] ?? "";
      // {prop: ""}
      if (prop === "") return false;

      if (typeof prop === "object") {
        // {prop: {}}
        if (Object.keys(prop).length === 0) return false;

        // {prop: {noValue: true}}
        if ("noValue" in prop && prop.noValue === true) return false;
      }
      return true;
    })
    .reduce((previus: PropsWithoutNotProvidedValues, current: string) => {
      const newObject = previus;
      newObject[`${current}`] = object[`${current}`] as string;
      return newObject;
    }, {});
};
