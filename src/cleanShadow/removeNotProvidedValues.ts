import { fromMapToPlainObject } from "../fromMapToPlainObject/fromMapToPlainObject";

/**
 * { state: { reported: {...} } }
 */
export type receivedShadow = {
  state: {
    reported: shadowObject;
  };
};

/**
 * "Connectivity Monitoring": {...}
 */
export type shadowObject = Record<string, mapId>;

/**
 * "0": {...}
 */
type mapId = Record<string, props>;

/**
 *
 * {"SMNC": "1"}
 * {"Router IP Addresses": {}},
 *
 */
export type props = Record<string, value>;

export type value = string | {} | noValue | propMap;

/**
 * {"noValue": true}
 */
export type noValue = {
  noValue: boolean;
};

/**
 *  {"0": "ibasis.iot"}
 */
export type propMap = Record<string, string>;

// TODO: add types
// TODO: add unit test
/**
 * Iterate object to remove not provided values
 */
export const removeNotProvidedValues = (shadow: any) => {
  for (const object of Object.keys(shadow)) {
    shadow[`${object}`] = shadow[`${object}`]!.map((element) =>
      checkProps(element)
    );
  }
  return shadow;
};

export type PropsWithoutNotProvidedValues = Record<string, string | propMap>;

/**
 * Remove property from shadow when its value is:
 *    No value --> {"noValue": true}
 *    Empty string --> {prop: ""}
 *    Empty object --> {prop: {}}
 */
export const checkProps = (
  object: props
): PropsWithoutNotProvidedValues => {
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
