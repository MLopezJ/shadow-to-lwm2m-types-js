import { removeNotProvidedValues } from "./cleanShadow/removeNotProvidedValues";
import { nameToId } from "./fromNamesToIds/nameToId";
import { fromMapToPlainObject } from "./fromMapToPlainObject/fromMapToPlainObject";
import coioteShadow from "./input/shadow.json";
import { fromIdToUrn } from "./updateResourceId";
import coioteLwM2MJsonShcema from "./input/coioteLwM2MJsonShcema.schema.json";
import sc from "schema-casting";
import { ReceivedShadow } from "./input/shadowType";
import { LwM2MIds, LwM2MTypes } from "./input/LwM2M-ids";
import jsonSchema from '../node_modules/@nordicsemiconductor/lwm2m-types/LwM2MDocument.schema.json' // TODO: export json schema from lib

/**
 * Complete flow of transformation from Coiote shadow format to LwM2M
 */
// TODO: define json shcema type using @nordicsemiconductor/lwm2m-types lib
export const main = async (
  shadow: ReceivedShadow,
  jsonSchema: any,
  ids: LwM2MTypes 
) => {
  // step 1: Transform shadow from map to plain object
  const plainObject = fromMapToPlainObject(shadow.state.reported);

  // step 2: Remove not provided values
  const cleanObject = removeNotProvidedValues(plainObject);

  // step 3: Combine ids with values
  const objectWithIds = nameToId(cleanObject, ids); 

  // step 4: Transform id of element to URN
  const objectWithUrn = await fromIdToUrn(objectWithIds!);

  // step 5: Cast data
  const castObject = sc(jsonSchema, objectWithUrn);

  return castObject;
  // step 6: validate result
  const result = {};
  // TODO: add validate function from @nordicsemiconductor/lwm2m-types
  // More info: https://github.com/MLopezJ/shadow-to-lwm2m-types-js/issues/3#issuecomment-1376025247
};

main(coioteShadow, jsonSchema, LwM2MIds);
