import { getObjectId, getPropId } from "./getElementId"

describe("getElementId", ()=> {

    it("given the object name should return the id of the object", ()=>{
      const value = "Temperature"
      const expected = "3303"
      expect(getObjectId(value)).toBe(expected)  
    })

    it("should return undefined when name of the object does not exist", ()=>{
        const value = "new object name"
        const expected = undefined
        expect(getObjectId(value)).toBe(expected)  
    })
})


describe("getPropId", ()=> {

    it("given the property name should return the id of the prop", ()=>{
      const propName = "Application Type"
      const LwM2MProps = {
        "Application Type": "5750",
        "Fractional Timestamp": "6050",
        "Max Measured Value": "5602",
      }
      const propId = "5750"
      expect(getPropId(propName, LwM2MProps)).toBe(propId)  
    })

    it("should return undefined when name of the prop does not exist", ()=>{
        const propName = "new prop name"
        const LwM2MProps = {
            "Application Type": "5750",
            "Fractional Timestamp": "6050",
            "Max Measured Value": "5602",
        }
        const propId = undefined
        expect(getPropId(propName, LwM2MProps)).toBe(propId)  
    })
})

describe("getIds", ()=> {

    it("given the object name should return the id of the object", ()=>{
      const value = "Temperature"
      const expected = "3303"
      expect(getObjectId(value)).toBe(expected)  
    })

    it("should return undefined when name of the object does not exist", ()=>{
        const value = "new object name"
        const expected = undefined
        expect(getObjectId(value)).toBe(expected)  
    })
})