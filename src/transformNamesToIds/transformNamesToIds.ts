import { LwM2MIds } from "../shadow/LwM2M-ids/"; 
import { getObjectId, getPropId } from "./getElementId";

type shadow = Record<string, value>;

type value = Record<string, string>[];

/*
{
  "Temperature": [
    {
      "Max Measured Value": "23.51",
      "Max Range Value": "85.0",
      "Min Measured Value": "23.51",
      "Min Range Value": "-40.0",
      "Sensor Units": "Celsius degrees",
      "Sensor Value": "24.57",
      "Timestamp": "2022-10-07T13:33:22Z"
    }
  ]
}

{
    "3303": [
        {
        "5518": "1665149633",
        "5601": "23.51",
        "5602": "23.51",
        "5603": "-40",
        "5604": "85",
        "5700": "24.57",
        "5701": "Celsius degrees"
        }
    ]
}


 return shadow[`${resource}`]!.map(propsObject => 
                
                Object.entries(propsObject).map(([propName,propValue]: [string, string]): Record<string, string>[] | undefined => getProps(propName, propValue, getLwM2MProps(propName??'')) 
            


                .map(([propName,propValue]: [string, string]) => {
                const LwM2MProps = getLwM2MProps(resource??'')?? {}
                return pairValue(propName, propValue, LwM2MProps)
            })
            
            
            {
            return Object.entries(propsObject)
            
        })

*/


export const transformNamesToIds = (shadow: shadow): shadow => {
  const resources = Object.keys(shadow);

  resources
    .map((resource) => {
      const objectId = getObjectId(resource);
      if (objectId !== undefined) {
        return shadow[`${resource}`]!
        .map((propsObject): any =>  
            Object
                .keys(propsObject)
                .map( prop => { return {[`${prop}`] : propsObject[`${prop}`]}}))
        .map((element: Record<string, string>) => {
            console.log(element)
            const propName = Object.keys(element)[0]?? ''
            const propValue = Object.values(element)[0] ?? ''
            //console.log(element, propName, propValue, '!@#')
            return pairValue(propName, propValue, getLwM2MProps(resource??'')?? {})
        })
      }
    })
    .reduce((previus, current): any => {
      //console.log(previus, current);
      if (current !== undefined) return current;
    }, {});

  // return newShadow
};

/**
 * Return the object props given the LwM2M resource name
 */
export const getLwM2MProps = (
  resourceName: string
): Record<string, string> | undefined =>
  LwM2MIds[`${resourceName}`] !== undefined
    ? LwM2MIds[`${resourceName}`].properties
    : undefined;


/**
 * 
 * Pair ID with value
 */
export const pairValue = (
  name: string,
  value: string,
  LwM2MProps: Record<string, string>
): Record<string, string> | undefined => {
  const id = getPropId(name, LwM2MProps);
  if (id !== undefined) {
    return { [`${id}`]: value };
  }
};

/*
    //const [propName, propValue] = prop
    const LwM2MProps = {
        "Application Type": "5750",
        "Fractional Timestamp": "6050",
        "Max Measured Value": "5602",
        "Max Range Value": "5604",
        "Measurement Quality Indicator": "6042",
        "Measurement Quality Level": "6049",
        "Min Measured Value": "5601",
        "Min Range Value": "5603",
        "Reset Min and Max Measured Values": "5605",
        "Sensor Units": "5701",
        "Sensor Value": "5700",
        Timestamp: "5518",
    } // get LwM2M props 
    const propId = getPropId(propName, LwM2MProps)
    if (propId !== undefined)  {
        newProps[`${propId}`] = propValue
        return {[`${propId}`] : propValue}
    }
})
//console.log(a)
return a
*/
