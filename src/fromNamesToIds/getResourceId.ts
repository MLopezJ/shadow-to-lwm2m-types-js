import { LwM2MIds } from "../shadow/LwM2M-ids";

/**
 * Return the id given the name of the resource
 */
export const getResourceId = (resourceName: string): string | undefined => {
  if (LwM2MIds[`${resourceName}`] !== undefined) {
    const object = LwM2MIds[`${resourceName}`]; // FIXME
    const id = object[`${resourceName}`];
    return id;
  }
  return undefined;
};
