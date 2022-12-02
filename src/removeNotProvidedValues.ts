import type { propMap, value } from "./cleanShadow";

type filteredPlainObject = Record<string, string | propMap>;

type plainObject = Record<string, value>;

/**
 * Remove property from shadow when its value is {"noValue": true} or empty string or empty object
 */
export const removeNotProvidedProp = (
  object: plainObject
): filteredPlainObject => {
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
    .reduce((previus: Record<string, string>, current: string) => {
      const newObject = previus;
      newObject[`${current}`] = object[`${current}`] as string;
      return newObject;
    }, {});
};
