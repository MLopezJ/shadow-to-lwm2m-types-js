/**
 * Return the URN of the resource following the next format:
 *      '<"oma"|"ext"|"x">:<ObjectID>:<ObjectVersion>@<LWM2MVersion>'
 *
 * If 'ObjectVersion' and/or 'LWM2MVersion' equal to '1.0', value is omitted.
 *
 * More info: https://github.com/NordicSemiconductor/lwm2m-types-js/blob/994cf2502fd9a50462e62c7ae3a58b714b4327bd/src/type-generation/createURN.ts#L9
 *
 */
export const getURN = async (id: string): Promise<string> => {
    try {
      const element = await import(
        `../node_modules/@nordicsemiconductor/lwm2m-types/types/${id}`
      );
      return element[`objectURN`];
    } catch (err: any) {
      console.log(err);
      return err;
    }
  };