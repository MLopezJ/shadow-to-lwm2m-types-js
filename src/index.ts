import { removeNotProvidedValues } from "./cleanShadow/removeNotProvidedValues";
import { nameToId } from "./fromNamesToIds/nameToId";
import { fromMapToPlainObject } from "./fromMapToPlainObject/fromMapToPlainObject";
import { fromIdToUrn } from "./updateResourceId";
import sc from "schema-casting";
import { ReceivedShadow, ShadowObject } from "./input/shadowType";
import { LwM2MTypes } from "./input/LwM2M-ids";
import jsonSchema from "../node_modules/@nordicsemiconductor/lwm2m-types/LwM2MDocument.schema.json"; // TODO: export json schema from lib

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
  const plainObject = step1(shadow);
  
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
    fromMapToPlainObject, // step 1
    removeNotProvidedValues, // step 2
    nameToId, // step 3
    fromIdToUrn, // step 4
    sc // step 5
  );

