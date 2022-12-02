import type { shadowObject, noValue, propMap } from "./cleanShadow";

export type plainObject = Record<string, propObject[]>;

type propObject = Record<string, prop>;

type prop = string | noValue | {} | propMap;

/**
 * Transform map data struct to plain object
 */
export const fromMapToPlainObject = (value: shadowObject): plainObject => {
  const objectKeys = Object.keys(value);
  return objectKeys.reduce((previus: any, currentObject) => {
    const mapKeys = Object.keys(value[`${currentObject}`]!);
    const objectPropsList = mapKeys.map((key) => {
      const props = Object.keys(value[`${currentObject}`]![`${key}`]!);
      const propsObject = props.reduce(
        (previusResult: {} | any, currentProp: string) => {
          const newObject = previusResult;

          const objectProp: prop =
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
