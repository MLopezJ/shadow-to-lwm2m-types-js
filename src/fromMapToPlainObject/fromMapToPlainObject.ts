import { ShadowObject, value } from "../input/shadowType";

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
 * Transforms data struct to plain object
 */
export const fromMapToPlainObject = (
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
