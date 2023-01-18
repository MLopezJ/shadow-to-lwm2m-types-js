import jsonSchema from "../node_modules/@nordicsemiconductor/lwm2m-types/LwM2MDocument.schema.json"; // TODO: export json schema from lib
import { value } from "./input/shadowType";

/**
 * Return the URN of the resource following the next format:
 *      '<"oma"|"ext"|"x">:<ObjectID>:<ObjectVersion>@<LWM2MVersion>'
 *
 * If 'ObjectVersion' and/or 'LWM2MVersion' equal to '1.0', value is omitted.
 *
 * More info: https://github.com/NordicSemiconductor/lwm2m-types-js/blob/994cf2502fd9a50462e62c7ae3a58b714b4327bd/src/type-generation/createURN.ts#L9
 *
 */
export const getURN = async (id: string): Promise<string> => {
  try {
    const element = await import(
      `../node_modules/@nordicsemiconductor/lwm2m-types/types/${id}`
    );
    return element[`objectURN`];
  } catch (err: any) {
    console.log(err);
    return err;
  }
};

/**
 * Return type of given resource
 */
export const getResourceType = (resourceUrn: string): string => {
  return jsonSchema.properties[`${resourceUrn}`].type;
};

/**
 * Should transform data type of given value
 */
export const castData = (
    type: string,
    value: string
  ): number | boolean | string | string[] => {
    // special rule
    if ((value === "false" || value === "true") && type === "integer") {
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
 * Return type of given prop
 */
export const getPropType = (resourceURN: string, propId: string) => {
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
 *
 * Return true if the value is clasificaded as "no provided"
 *
 *   No value --> {"noValue": true}
 *   Empty string --> {prop: ""}
 *   Empty object --> {prop: {}}
 */
export const isNotProvidedValue = (value: value): boolean => {
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
