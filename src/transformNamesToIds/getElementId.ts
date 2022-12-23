import { LwM2MIds } from "../shadow/LwM2M-ids"

/**
 * 
 * Return the id given the name of the object
 */
export const getObjectId = (objectName: string): string|undefined => {
    if (LwM2MIds[`${objectName}`]!== undefined){
        const object = LwM2MIds[`${objectName}`]
        const id = object[`${objectName}`]
        return id 
    }
    return undefined
}

export const getPropId = (propName:string, propIds:Record<string, string> ) : string| undefined => propIds[`${propName}`] ?? undefined