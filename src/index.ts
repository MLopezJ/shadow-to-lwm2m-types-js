import jsonSchema from "../node_modules/@nordicsemiconductor/lwm2m-types/LwM2MDocument.schema.json"; // TODO: export json schema from lib
import { LwM2MIds } from "./input/LwM2M-ids";
import {
  ReceivedShadow,
  ShadowObject,
  props,
  value,
} from "./input/shadowType";
import { castData, getPropType, getResourceType, getURN, isNotProvidedValue } from "./utils";

/**
 *
 * Transform coiote shadow in LwM2M format
 */
export const main = async (ReceivedShadow: ReceivedShadow) => {
  const shadow: ShadowObject = ReceivedShadow.state.reported;

  const LwM2MResources = Object.keys(shadow).map(async (resourceName: string) => {
    /**
     * Get props from resource
     */
    const unprocessedProps: props[] = Object.values(shadow[`${resourceName}`]);

    const resourceId = getResourceId(resourceName);

    /**
     * Exclude if resource is not part of the provided LwM2M resources ids
     * More: src/input/LwM2M-ids/index.ts
     */
    if (resourceId) {
      const resourceUrn = await getURN(resourceId);
      const resourceType = getResourceType(resourceUrn);

      /**
       * Process props
       */
      const props = unprocessedProps.map((prop) =>
        getProps(prop, resourceName, resourceUrn)
      );

      if (resourceType === "object") {
        const object = props.reduce((current, previus) => {
          return { ...current, ...previus };
        }, {});
        return { [`${resourceUrn}`]: object };
      }

      return { [`${resourceUrn}`]: props };
    }
  });

  try {
    const LwM2MObject = await Promise.all(LwM2MResources);
    return LwM2MObject
      .filter((resource) => resource !== undefined)
      .reduce((current, previus) => {
        return { ...current, ...previus };
      }, {});
  } catch (err) {
    return err;
  }
};

/**
 * Transform coiote props in LwM2M props
 *
 *   1- Remove not provided values
 *   2- Remove not existed props
 *   3- cast data
 */
const getProps = (
  propsObject: props,
  resourceName: string,
  resourceURN: string
) => {
  return Object.entries(propsObject)
    .map(([name, value]: [string, value]) => {
      if (isNotProvidedValue(value)) {
        return undefined;
      }

      const propId = getPropId(resourceName, name);

      if (propId === undefined) {
        return undefined;
      }

      const castedValue = castData(
        getPropType(resourceURN, propId),
        value as string
      );

      return { [`${propId}`]: castedValue };
    })
    .filter((prop) => prop !== undefined)
    .reduce((previus, current) => {
      return { ...previus, ...current };
    }, {});
};

/**
 * Return LwM2M id of given resource if exist
 */
const getResourceId = (resourceName: string): string | undefined =>
  LwM2MIds[`${resourceName}`] !== undefined
    ? LwM2MIds[`${resourceName}`]["id"]
    : undefined;

/**
 * Return LwM2M id of given prop if exist
 */
const getPropId = (
  resourceName: string,
  propName: string
): string | undefined => {
  const resourceExist =
    LwM2MIds[`${resourceName}`] !== undefined
      ? LwM2MIds[`${resourceName}`]
      : false;
  if (resourceExist) {
    const propExist = resourceExist["properties"][`${propName}`];
    if (propExist) {
      return propExist;
    }
  }
  return undefined;
};

