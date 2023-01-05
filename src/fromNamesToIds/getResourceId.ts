import { LwM2MIds, LwM2MTypes } from "../shadow/LwM2M-ids";

/**
 * Return the id given the name of the resource
 */

export const getResourceId = (
  resourceName: keyof LwM2MTypes
): string | undefined => {
  if (LwM2MIds[`${resourceName}`] !== undefined) {
    const object = LwM2MIds[`${resourceName}`];
    const id = object["id"];
    return id;
  }
  return undefined;
};
