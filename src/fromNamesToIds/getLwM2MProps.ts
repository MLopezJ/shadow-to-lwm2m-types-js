import { LwM2MIds, LwM2MTypes } from "../shadow/LwM2M-ids";

/**
 * Return the resource props given the LwM2M resource name
 */
export const getLwM2MProps = (
  resourceName: keyof LwM2MTypes
): Record<string, string> | undefined =>
  LwM2MIds[`${resourceName}`] !== undefined
    ? LwM2MIds[`${resourceName}`].properties
    : undefined;
