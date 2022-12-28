import { getPropsId } from "./getPropsId";
import { getResourceId } from "./getResourceId";

type shadow = Record<string, props>;

export type props = Record<string, string>[];

/**
 * Replace names with their equivalent ID
 */
export const nameToId = (
  shadow: shadow
): { [x: string]: (Record<string, string> | undefined)[] } | undefined =>
  Object.keys(shadow)
    .map((resource) => {
      const objectId = getResourceId(resource);
      return objectId !== undefined
        ? { [`${objectId}`]: getPropsId(shadow[`${resource}`]!, resource) }
        : undefined;
    })
    .filter((element) => element !== undefined)
    .reduce((previus, current) => {
      return { ...previus, ...current };
    }, {});
