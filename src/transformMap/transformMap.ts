import { getResourceId } from "../fromNamesToIds/getResourceId";
import { ShadowObject, value } from "../input/shadowType";
import jsonSchema from "../../node_modules/@nordicsemiconductor/lwm2m-types/LwM2MDocument.schema.json"; // TODO: export json schema from lib
import { getURN } from "../updateResourceId";
import { LwM2MTypes } from "../input/LwM2M-ids";
import {
  removeNotProvidedValues,
  checkProps,
} from "../cleanShadow/removeNotProvidedValues";

/**
 * { physCellId: "247" }
 */
export type Props = Record<string, value>;

/**
 * "ECID-Signal Measurement Information": [
 *  {
 *    physCellId: "247",
 *    ECGI: "0",
 *    "Last Bootstrapped":
 *      { noValue: true }
 *  }
 * ]
 */
export type PlainShadowObject = Record<string, Props[]>;

/**
 * Transforms data struct
 */
export const transformMap = (
  resources: ShadowObject,
  ids: any
): PlainShadowObject | any => {
  // should be a method. resourceInfo could be the name
  const result = Object.keys(resources).map(async (resource) => {
    const id = getResourceId(resource as any, ids);
    const urn = await getURN(id!);
    const type = jsonSchema.properties[`${urn}`].type;
    return { urn, type, name: resource };
  });
  // end of method

  Promise.all(result)
    .then((result) => {
      result.reduce((previus: any, currentA) => {
        const object = resources[`${currentA.name}`];
        const result = Object.keys(object)
          .map((position) => checkProps(object[`${position}`])) // removeNotProvidedValues
          .reduce((previus: any, current) => {
            if (previus === undefined) {
              if (currentA.type === "array") {
                return [current];
              }
              if (currentA.type === "object") {
                return { ...current };
              }
            } else {
              if (currentA.type === "array") {
                previus.push(current);
                return previus;
              }
              if (currentA.type === "object") {
                const a = current;
                console.log("!@!@!@!@!@!@", { previus, a });
                return { previus, current }; // how to join 2 objects
              }
            }
          }, undefined);
        console.log(`${currentA.urn}`, result);
      }, {});
    })
    .catch((error) => console.log(error));
};

const getProps = (props) => {
  //console.log(props);
  // clean props
  return props;
};

/**
 * Transforms data struct to plain object
 * Original implementation
 */
export const transformMapOriginal = (
  value: ShadowObject
): PlainShadowObject => {
  const objectKeys = Object.keys(value);
  return objectKeys.reduce((previus: any, currentObject) => {
    const mapKeys = Object.keys(value[`${currentObject}`]!);
    const objectPropsList = mapKeys.map((key) => {
      const props = Object.keys(value[`${currentObject}`]![`${key}`]!);
      const propsObject = props.reduce(
        (previusResult: {} | any, currentProp: string) => {
          const newObject = previusResult;

          const objectProp: value =
            value[`${currentObject}`]![`${key}`]![`${currentProp}`] ?? "";

          if (typeof objectProp === "string")
            newObject[`${currentProp}`] = objectProp;

          if (typeof objectProp === "object") {
            const object = Object.keys(objectProp);

            if ("noValue" in objectProp && objectProp.noValue !== undefined)
              newObject[`${currentProp}`] = objectProp;
            else {
              if (object.length === 0) {
                newObject[`${currentProp}`] = objectProp;
              } else {
                newObject[`${currentProp}`] = Object.values(objectProp);
              }
            }
          }

          return newObject;
        },
        {}
      );

      return propsObject;
    });

    previus[`${currentObject}`] = objectPropsList;
    return previus;
  }, {});
};
