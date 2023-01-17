import { getURN } from "../updateResourceId";
import { getResourceId } from "../fromNamesToIds/getResourceId";
import jsonSchema from "../../node_modules/@nordicsemiconductor/lwm2m-types/LwM2MDocument.schema.json"; // TODO: export json schema from lib
import { PlainShadowObject } from "./transformMap";
import { ShadowObject } from "../input/shadowType";
import { checkProps } from "../cleanShadow/removeNotProvidedValues";
import { LwM2MIds, LwM2MTypes } from "../input/LwM2M-ids";
import { combineNamesWithIds } from "../fromNamesToIds/getPropsId";
import { Properties } from "../fromNamesToIds/nameToId";
import sc from "schema-casting";

// get urn, type and name
const getResourcesInfo = async (resources: ShadowObject, ids: any) => {
  const info = Object.keys(resources)
    .map(async (resource) => {
      const id = getResourceId(resource as any, ids);
      const urn = await getURN(id!);

      // get Json Schema info
      const type = jsonSchema.properties[`${urn}`].type;
      const propsJsonSchema =
        jsonSchema.properties[`${urn}`].items !== undefined
          ? jsonSchema.properties[`${urn}`].items.properties
          : jsonSchema.properties[`${urn}`].properties; // properties // items
      // get Json Schema info

      // remove map struct
      const resourceProps = cleanShadow(
        resources[`${resource}`],
        type,
        resource,
        propsJsonSchema
      );

      const props =
        type === "object"
          ? resourceProps.reduce((previus, current) => {
              return { ...previus, ...current };
            }, {})
          : resourceProps;


      const LwM2MResource = { [`${urn}`]: props }

      return sc(jsonSchema, LwM2MResource)

      return { [`${urn}`]: props };
      //return { urn, type, name: resource, props: resourceProps };
    })

    /*
    ;*/

  try {
    const result = await Promise.all(info);
    return result;
  } catch (err) {
    return err;
  }
};






/* 
/*.map((props) => {
      //console.log(props, ' !!! ')
    
      //Object.keys(props).map(prop => console.log('individual prop ', objectId, prop,  props[`${prop}`]))
    
    }); // //
    
    */

const getProps = (
  props: Record<string, string>,
  jsonSchemaProps: Record<string, Record<string, string>>
) => {
  return Object.keys(props)
    .map((key: string) => {
      if (jsonSchemaProps[`${key}`].type === "array") {
        // console.log(key, 'values should be, ', Object.values(props[`${key}`]))
        return { [key]: Object.values(props[`${key}`]) };
      }
      return { [key]: props[`${key}`] };
    })
    .reduce((previus: any, current) => {
      return { ...previus, ...current };
    }, {});
};


// remove map struct
const cleanShadow = (
  resource: any,
  type: string,
  objectName: string,
  jsonSchema
) => {
  return Object.values(resource).map((props) => {
    // removeNotProvidedValues
    const propsWithoutProvidedValues = checkProps(props);

    // combine name with ids.  get props ids
    const propsWithIds = combineNamesWithIds(
      propsWithoutProvidedValues as any,
      objectName as any,
      LwM2MIds
    );

    // remove map struct on props
    const removeMapStructOnProps = getProps(propsWithIds!, jsonSchema);
    return removeMapStructOnProps;
  });

  // from prop name to prop id
  /*
      .map(props => {
        console.log('~~',props, objectName)
        console.log(getPropsId(props as any, objectName as any, LwM2MIds))
        return props
      })
      */
  //
  /*
      .map((props) =>
        getPropsId(props as Properties, resource as any, LwM2MIds)
      )
       */
};

export const main = async (resources: ShadowObject, ids: any) => {
  const info = await getResourcesInfo(resources, ids);
  return info.reduce((previus: any, current) => {
    return { ...previus, ...current };
  }, {});
  //info.map((element) => console.log(element, element.props));
};

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
