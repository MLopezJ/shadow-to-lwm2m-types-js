# shadow-to-lwm2m-types-js

Generate a [LwM2M Object](https://github.com/NordicSemiconductor/lwm2m-types-js) from a given shadow.

This is usefull to transform a shadow to [LwM2M Object](https://github.com/NordicSemiconductor/lwm2m-types-js) format

## Installation

```bash
npm ci
npm test
```

## How to use it

In order to generate a LwM2M representation of a shadow, it is needed to provided 2 documents: 

1. Shadow 
2. Object with the relation between names and ids (and its TypeScript types)

Then, execute the main function 

``` javascript

main(shadow, ids);

```

### Example 

* [shadow](./src/input/shadow.json)
* [Object with ids (LwM2MIds)](./src/input/LwM2M-ids/index.ts) 
* [TypeScript Types (LwM2MTypes)](./src/input/LwM2M-ids/index.ts) 

See [example](./src/example.ts) for more.

## Expected Input

### Shadow

```json
{
  "state": {
    "reported": {
      "Temperature": {
        "0": {
          "Application Type": "",
          "Fractional Timestamp": {
            "noValue": true
          },
          "Max Measured Value": "23.51",
          "Max Range Value": "85.0",
          "Measurement Quality Indicator": {
            "noValue": true
          },
          "Measurement Quality Level": {
            "noValue": true
          },
          "Min Measured Value": "23.51",
          "Min Range Value": "-40.0",
          "Reset Min and Max Measured Values": {
            "noValue": true
          },
          "Sensor Units": "Celsius degrees",
          "Sensor Value": "24.57",
          "Timestamp": "2022-10-07T13:33:22Z"
        }
      }
    }
  }
}
```

## Expected output

```json
{
  "3303:1.1": [
    {
      "5518": 1665149633,
      "5601": 23.51,
      "5602": 23.51,
      "5603": -40,
      "5604": 85,
      "5700": 24.57,
      "5701": "Celsius degrees"
    }
  ]
}
```

## Expected process: Map names and ids

Pair each object of the shadow with their equivalent id in LwM2M
- [x] Done

```typescript
export const Temperature = {
  Temperature: {
    ObjectID: 3303,
    properties: {
      "Application Type": 5750,
      "Fractional Timestamp": 6050,
      "Max Measured Value": 5602,
      "Max Range Value": 5604,
      "Measurement Quality Indicator": 6042,
      "Measurement Quality Level": 6049,
      "Min Measured Value": 5601,
      "Min Range Value": 5603,
      "Reset Min and Max Measured Values": 5603,
      "Sensor Units": 5701,
      "Sensor Value": 5700,
      Timestamp: 5603,
    },
  },
};
```

## Expected process: Transform shadow from map to plain object
- [x] Done

```json
{
  "Temperature": [
    {
      "Application Type": "",
      "Fractional Timestamp": {
        "noValue": true
      },
      "Max Measured Value": "23.51",
      "Max Range Value": "85.0",
      "Measurement Quality Indicator": {
        "noValue": true
      },
      "Measurement Quality Level": {
        "noValue": true
      },
      "Min Measured Value": "23.51",
      "Min Range Value": "-40.0",
      "Reset Min and Max Measured Values": {
        "noValue": true
      },
      "Sensor Units": "Celsius degrees",
      "Sensor Value": "24.57",
      "Timestamp": "2022-10-07T13:33:22Z"
    }
  ]
}
```

## Expected process: Clean not provided value in shadow
- [x] Done

```json
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
```

## Expected process: Combine ids with values
- [x] Done

```json
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
```

## Expected process: Update id
- [x] Done

```json
{
  "3303:1.1": [
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
```

## Expected process: cast data
- [x] Done

```json
{
  "3303:1.1": [
    {
      "5518": 1665149633,
      "5601": 23.51,
      "5602": 23.51,
      "5603": -40,
      "5604": 85,
      "5700": 24.57,
      "5701": "Celsius degrees"
    }
  ]
}
```

## Expected process: validate object
- [ ] Done

### TODO:
- [ ] Export `validate` and `createURN` from `@nordicsemiconductor/lwm2m-types`
- [ ] Use `@nordicsemiconductor/lwm2m-types` to define prop type https://github.com/MLopezJ/shadow-to-lwm2m-types-js/pull/4/files#diff-a2a171449d862fe29692ce031981047d7ab755ae7f84c707aef80701b3ea0c80 

```typescript
import { validate } from "@nordicsemiconductor/lwm2m-types";
const temperature = {
  "3303:1.1": [
    {
      "5518": 1665149633,
      "5601": 23.51,
      "5602": 23.51,
      "5603": -40,
      "5604": 85,
      "5700": 24.57,
      "5701": "Celsius degrees",
    },
  ],
};
const maybeValidLwM2M = validate(temperature);

// Because is is know to be good, there must be no errors
if ("errors" in maybeValidLwM2M) {
  console.error(maybeValidLwM2M.errors);
  throw new Error(`Validation failed`);
}

// then we can access LwM2M objects in the shadow document
const shadow = maybeValidLwM2M.value;
```



## Usage

```
//TODO
```

## Building the object

```
//TODO
```
