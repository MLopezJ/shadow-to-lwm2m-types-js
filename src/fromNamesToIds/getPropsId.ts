import { getLwM2MProps } from "./getLwM2MProps";
import { pairValue } from "./pairValue";
import type { Properties } from "./nameToId";
import type { LwM2MTypes } from "../shadow/LwM2M-ids";

/**
 * Transform keys of the object to their equivalent id at the props level
 */
 export const getPropsId = (
    object: Properties,
    resource: keyof LwM2MTypes
  ): (Record<string, string> | undefined)[] =>
    object!.map((propsObject: Record<string, string>) =>
      Object.entries(propsObject)
        .map(([name, value]: [string, string]) => {
          return pairValue(name, value, getLwM2MProps(resource ?? "") ?? {});
        })
        .filter((element) => element !== undefined)
        .reduce((previus, current) => {
          return { ...previus, ...current };
        }, {})
    );

/**
 * Return the id given the name of the prop
 */
export const getPropId = (propName:string, propIds:Record<string, string> ) : string| undefined => propIds[`${propName}`] ?? undefined