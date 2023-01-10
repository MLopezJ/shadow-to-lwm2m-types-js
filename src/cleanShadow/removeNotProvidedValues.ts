import { propMap, value } from "../shadow/shadowType";

/**
 * { physCellId: "247" }
 */
export type Props = Record<string, value>;

/**
 * "ECID-Signal Measurement Information": [
 *  {
 *    physCellId: "247",
 *    ECGI: "0",
 *    "Last Bootstrapped":
 *      { noValue: true }
 *  }
 * ]
 */
export type Shadow = Record<string, Props[]>;

export type ShadowWithoutNotProvidedValues = Record<
  string,
  PropsWithoutNotProvidedValues[]
>;

/**
 * Iterate object to remove not provided values
 */
export const removeNotProvidedValues = (
  inputValue: Shadow
): ShadowWithoutNotProvidedValues => {
  const shadow: ShadowWithoutNotProvidedValues = {};
  for (const key of Object.keys(inputValue)) {
    shadow[`${key}`] = inputValue[`${key}`]!.map((element) =>
      checkProps(element)
    );
  }
  return shadow;
};

export type PropsWithoutNotProvidedValues = Record<
  string,
  string | propMap | string[]
>;

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
