import { LwM2MTypes } from "../input/LwM2M-ids";

/**
 * Return the id given the name of the resource
 */

export const getResourceId = (
  name: keyof LwM2MTypes,
  ids: LwM2MTypes
): string | undefined => {
  if (ids[`${name}`] !== undefined) {
    const object = ids[`${name}`];
    const id = object["id"];
    return id;
  }
  return undefined;
};
