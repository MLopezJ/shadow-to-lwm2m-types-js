import { LwM2MIds } from "../shadow/LwM2M-ids";

/**
 * Return the object props given the LwM2M resource name
 */
 export const getLwM2MProps = (
    resourceName: string
  ): Record<string, string> | undefined =>
    // FIXME
    LwM2MIds[`${resourceName}`] !== undefined
      ? LwM2MIds[`${resourceName}`].properties
      : undefined;