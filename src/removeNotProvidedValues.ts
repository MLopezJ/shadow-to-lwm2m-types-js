type noValue = {
  noValue: boolean;
};
type value = string | noValue;

/**
 * Remove property from shadow when its value is {"noValue": true} or an empty string
 */
export const removeNotProvidedProp = (object: Record<string, value>) => {
  return Object.keys(object)
    .filter((id) => {
      if (object[`${id}`] === "") return false;
      if (
        typeof object[`${id}`] === "object" &&
        (object[`${id}`] as noValue)["noValue"]
      )
        return false;
      return true;
    })
    .reduce((previus: Record<string, string>, current: string) => {
      const newObject = previus;
      newObject[`${current}`] = object[`${current}`] as string;
      return newObject;
    }, {});
};
