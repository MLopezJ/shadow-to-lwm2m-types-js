import jsonSchema from "../node_modules/@nordicsemiconductor/lwm2m-types/LwM2MDocument.schema.json"; // TODO: export json schema from lib
import { LwM2MIds } from "./input/LwM2M-ids";
import {
  ReceivedShadow,
  ShadowObject,
  props,
  value,
} from "./input/shadowType";
import { getURN } from "./updateResourceId";

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
 * Should transform data type of given value
 */
const castData = (
  type: string,
  value: string
): number | boolean | string | string[] => {
  // special rule
  if (value === "false" || (value === "true" && type === "integer")) {
    return value === "false" ? 0 : 1;
  }

  if (type === "integer") {
    return parseInt(value, 10);
  }

  if (type === "number") {
    return parseFloat(value);
  }

  if (type === "boolean") {
    return value === "true" || value === "1";
  }

  if (type === "array") {
    return Object.values(value);
  }

  return value; // string case
};

/**
 * Return type of given resource
 */
const getResourceType = (resourceUrn: string): string => {
  return jsonSchema.properties[`${resourceUrn}`].type;
};

/**
 * Return type of given prop
 */
const getPropType = (resourceURN: string, propId: string) => {
  const resourceType = getResourceType(resourceURN);
  const definition =
    resourceType === "array"
      ? jsonSchema.properties[`${resourceURN}`].items.properties[`${propId}`]
      : jsonSchema.properties[`${resourceURN}`].properties[`${propId}`];

  if (definition === undefined) {
    console.log(resourceURN, propId);
  }
  return definition.type;
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

/**
 *
 * Return true if the value is clasificaded as "no provided"
 *
 *   No value --> {"noValue": true}
 *   Empty string --> {prop: ""}
 *   Empty object --> {prop: {}}
 */
const isNotProvidedValue = (value: value): boolean => {
  // ""
  if (value === "") return true;

  if (typeof value === "object") {
    // {prop: {}}
    if (Object.keys(value).length === 0) return true;

    // {prop: {noValue: true}}
    if ("noValue" in value && value.noValue === true) return true;
  }
  return false;
};
