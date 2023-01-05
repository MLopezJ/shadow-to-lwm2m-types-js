import { getPropId } from "./getPropsId";


/**
 * Replace name of the prop with the equivalent id
 */
export const pairValue = (
  name: string,
  value: string,
  LwM2MProps: Record<string, string>
): Record<string, string> | undefined => {
  const id = getPropId(name, LwM2MProps);
  return id !== undefined ? { [`${id}`]: value } : undefined;
};
