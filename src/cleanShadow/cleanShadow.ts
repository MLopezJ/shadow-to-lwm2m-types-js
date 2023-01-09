import { fromMapToPlainObject } from "../fromMapToPlainObject/fromMapToPlainObject";
import { removeNotProvidedProp } from "./removeNotProvidedValues";

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

/**
 * Tranform value from map to plain object
 * and remove not usefull data from it
 */
export const cleanShadow = (shadow: receivedShadow) => {
  const plainShadow = fromMapToPlainObject(shadow.state.reported);
  for (const object of Object.keys(plainShadow)) {
    plainShadow[`${object}`] = plainShadow[`${object}`]!.map((element) =>
      removeNotProvidedProp(element)
    );
  }
  return plainShadow;
};

// TODO: add types
// TODO: add unit test
/**
 * Iterate object to remove not provided values
 */
export const removeNotProvidedValues = (shadow: any) => {
  for (const object of Object.keys(shadow)) {
    shadow[`${object}`] = shadow[`${object}`]!.map((element) =>
      removeNotProvidedProp(element)
    );
  }
  return shadow;
};
