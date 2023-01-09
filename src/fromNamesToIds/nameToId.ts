import type { LwM2MTypes } from "../shadow/LwM2M-ids";
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
      const objectId = getResourceId(resource as keyof LwM2MTypes);
      return objectId !== undefined
        ? { [`${objectId}`]: getPropsId(shadow[`${resource}`]!, resource as keyof LwM2MTypes) }
        : undefined;
    })
    .filter((element) => element !== undefined)
    .reduce((previus, current) => {
      return { ...previus, ...current };
    }, {});
