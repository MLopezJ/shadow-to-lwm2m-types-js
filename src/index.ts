import { removeNotProvidedValues } from "./cleanShadow/cleanShadow";
import { nameToId } from "./fromNamesToIds/nameToId";
import { fromMapToPlainObject } from "./fromMapToPlainObject/fromMapToPlainObject";
import coioteShadow from "./shadow/shadow.json";
import { fromIdToUrn } from "./updateResourceId";
import coioteLwM2MJsonShcema from "./shadow/coioteLwM2MJsonShcema.schema.json"
import sc from "schema-casting";

// TODO: set type on params
// TODO: set return function type
export const main = async (shadow: any, jsonSchema: any) => {
  // step 1: Transform shadow from map to plain object
  const plainObject = fromMapToPlainObject(shadow.state.reported); // TODO: set type struct

  // step 2: Remove not provided values
  const cleanObject = removeNotProvidedValues(plainObject);

  // step 3: Combine ids with values
  const objectWithIds = nameToId(cleanObject);

  // step 4: Transform id of element to URN
  const objectWithUrn = await fromIdToUrn(objectWithIds!); 

  // step 5: Cast data
  const castObject = sc(jsonSchema, objectWithUrn) 

  return castObject
  // step 6: validate result
  const result = {};
  // TODO: add validate function from @nordicsemiconductor/lwm2m-types
  // More info: https://github.com/MLopezJ/shadow-to-lwm2m-types-js/issues/3#issuecomment-1376025247  

};

main(coioteShadow, coioteLwM2MJsonShcema);
