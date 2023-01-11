import { ShadowWithoutNotProvidedValues } from "../cleanShadow/removeNotProvidedValues";
import type { LwM2MTypes } from "../shadow/LwM2M-ids";
import { getPropsId } from "./getPropsId";
import { getResourceId } from "./getResourceId";

export type Properties = Record<string, string>[];

export type ShadowWithIds = Record<string, (Record<string, string | string[]> | undefined)[]> | undefined

/**
 * Replace names with their equivalent ID
 */
export const nameToId = (
  shadow: ShadowWithoutNotProvidedValues,
  resourcesIds: LwM2MTypes
): ShadowWithIds =>
  Object.keys(shadow)
    .map((resource) => {
      const resourceId = getResourceId(resource as keyof LwM2MTypes, resourcesIds);
      if (resourceId !== undefined) {
        const props = shadow[`${resource}`]!;
        const propsId = getPropsId(props as Properties, resource as keyof LwM2MTypes, resourcesIds)
        return {
          [`${resourceId}`]: propsId,
        };
      }
      return undefined;
    })
    .filter((element) => element !== undefined)
    .reduce((previus, current) => {
      return { ...previus, ...current };
    }, {});
