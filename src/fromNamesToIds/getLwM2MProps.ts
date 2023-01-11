import { LwM2MTypes } from "../input/LwM2M-ids";

/**
 * Return the resource props given the LwM2M resource name
 */
export const getLwM2MProps = (
  name: keyof LwM2MTypes,
  ids: LwM2MTypes
): Record<string, string> | undefined =>
  ids[`${name}`] !== undefined
    ? ids[`${name}`].properties
    : undefined;
