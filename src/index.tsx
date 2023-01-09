import { removeNotProvidedValues } from "./cleanShadow/cleanShadow";
import { nameToId } from "./fromNamesToIds/nameToId";
import { fromMapToPlainObject } from "./fromMapToPlainObject/fromMapToPlainObject";
import coioteShadow from "./shadow/shadow.json";
import { fromIdToUrn } from "./updateResourceId";
import coioteLwM2MJsonShcema from "./shadow/coioteLwM2MJsonShcema.schema.json"
import sc from "schema-casting";

const main = async (shadow: any) => {
  // step 1: Transform shadow from map to plain object
  const plainObject = fromMapToPlainObject(shadow.state.reported); // TODO: set type struct
  console.log(plainObject);

  // step 2: Remove not provided values
  const cleanObject = removeNotProvidedValues(plainObject);
  console.log(cleanObject);

  // step 3: Combine ids with values
  const objectWithIds = nameToId(cleanObject);
  console.log(objectWithIds);

  // step 4: Transform id of element to URN
  const objectWithUrn = await fromIdToUrn(objectWithIds!); 
  console.log(objectWithUrn);

  // step 5: Cast data
  const castObject = sc(coioteLwM2MJsonShcema, objectWithUrn) 
  //castData(objectWithUrn);
  console.log(castObject);

  // step 6: validate result
  const result = {};

};

main(coioteShadow);
