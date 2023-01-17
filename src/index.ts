import {
  checkProps,
  removeNotProvidedValues,
} from "./cleanShadow/removeNotProvidedValues";
import { nameToId } from "./fromNamesToIds/nameToId";
import { transformMap } from "./transformMap/transformMap";
import { fromIdToUrn, getURN } from "./updateResourceId";
import sc from "schema-casting";
import { ReceivedShadow, ShadowObject } from "./input/shadowType";
import { LwM2MIds, LwM2MTypes } from "./input/LwM2M-ids";
import jsonSchema from "../node_modules/@nordicsemiconductor/lwm2m-types/LwM2MDocument.schema.json"; // TODO: export json schema from lib
import { getResourceId } from "./fromNamesToIds/getResourceId";
import { combineNamesWithIds } from "./fromNamesToIds/getPropsId";

/**
 * Steps to shadow transformation
 */
export const steps = async (
  shadow: ShadowObject,
  ids: LwM2MTypes,
  schema: typeof jsonSchema,
  step1: Function,
  step2: Function,
  step3: Function,
  step4: Function,
  step5: Function
) => {
  // step 1: Transform shadow from map to plain object
  const plainObject = step1(shadow, ids);

  // step 2: Remove not provided values
  const cleanObject = step2(plainObject);

  // step 3: Combine ids with values
  const objectWithIds = step3(cleanObject, ids);

  // step 4: Transform id of element to URN
  const objectWithUrn = await step4(objectWithIds!);

  // step 5: Cast data
  const castObject = step5(schema, objectWithUrn);

  return castObject;
};

/**
 * Transform shadow to LwM2M format given the relation between the shadow keys and the LwM2M objects ids
 */
export const main = async (shadow: ReceivedShadow, ids: LwM2MTypes) =>
  await steps(
    shadow.state.reported,
    ids,
    jsonSchema,
    transformMap, // step 1
    removeNotProvidedValues, // step 2
    nameToId, // step 3
    fromIdToUrn, // step 4
    sc // step 5
  );

/**
 * Given URN, return the type and props description of resource
 */
const getJsonSchemaInfo = (
  urn: string,
  jsonSchema: any // TODO: set correct type
): Record<string, string> => {
  const type = jsonSchema.properties[`${urn}`].type;
  const props =
    jsonSchema.properties[`${urn}`].items !== undefined
      ? jsonSchema.properties[`${urn}`].items.properties
      : jsonSchema.properties[`${urn}`].properties;

  return { type, props };
};

/**
 *
 * Remove map struct on props
 *
 * Map struct: { 0: {x: 1, y: 2}, 1: {x: 1, y: 2}}
 * Expected: [{x: 1, y: 2} {x: 1, y: 2}]
 */
const removeMapStruct = (
  props: Record<string, string>,
  jsonSchemaProps: Record<string, Record<string, string>>
) => {
  return Object.keys(props)
    .map((key: string) => {
      console.log(key, '!!!!', jsonSchemaProps)
      if (jsonSchemaProps[`${key}`].type === "array") {
        return { [key]: Object.values(props[`${key}`]) };
      }
      return { [key]: props[`${key}`] };
    })
    .reduce((previus: any, current) => {
      return { ...previus, ...current };
    }, {});
};

/**
 * Return props of resource after
 *  1- Remove not provided values
 *  2- Transform names to ids
 *  3- Remove Map struct
 */
const getProps = (resource: any, objectName: string, jsonSchema) => {
  return Object.values(resource).map((props) => {
    // remove not provided values
    const propsWithoutProvidedValues = checkProps(props);

    // combine name with ids.
    const propsWithIds = combineNamesWithIds(
      propsWithoutProvidedValues as any,
      objectName as any,
      LwM2MIds // TODO: Remove global
    );

    console.log(jsonSchema)

    // remove map struct on props
    const removeMapStructOnProps = removeMapStruct(propsWithIds!, jsonSchema);
    return removeMapStructOnProps;
  });
};

/**
 *  Return correct data struct depend on type definition
 */
const getPropsDataTypeDef = (type: string, props: any[]) =>
  type === "object"
    ? props.reduce((previus, current) => {
        return { ...previus, ...current };
      }, {})
    : props;

/**
 *
 */
const processResource = async (
  resources: ShadowObject,
  resource: keyof LwM2MTypes,
  ids: LwM2MTypes
) => {
  const id = getResourceId(resource as keyof LwM2MTypes, ids);
  const urn = await getURN(id!);
  
  const { typeDefinition, propsDefinition } = getJsonSchemaInfo(
    urn,
    jsonSchema
  );
  const properties = getProps(
    resources[`${resource}`],
    resource,
    jsonSchema
  );

  // check resource definition to set props with correct data struct
  const props = getPropsDataTypeDef(typeDefinition, properties);

  const LwM2MResource = { [`${urn}`]: props };

  return sc(jsonSchema, LwM2MResource); // cast data
};

/**
 *
 */
const getResources = async (resources: ShadowObject, ids: LwM2MTypes) => {
  const resourcesPromises = Object.keys(resources).map(async (resource) =>
    processResource(resources, resource as keyof LwM2MTypes, ids)
  );

  try {
    const result = await Promise.all(resourcesPromises);
    return result;
  } catch (err) {
    return err;
  }
};

/**
 *
 * Transform shadow
 */
export const main2 = async (resources: ShadowObject, ids: any) => {
  const result = await getResources(resources, ids);

  console.log(result)
  return result.reduce((previus: any, current) => {
    return { ...previus, ...current };
  }, {});
};
