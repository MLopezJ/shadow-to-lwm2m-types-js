# shadow-to-lwm2m-types-js

Generate a [LwM2M Object](https://github.com/NordicSemiconductor/lwm2m-types-js) from a given shadow.

This is usefull to transform a shadow to [LwM2M Object](https://github.com/NordicSemiconductor/lwm2m-types-js) format

## Installation

```bash
npm ci
npm test
```

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

### Mapping of names and ids

```json
[
  {
    "name": "Temperature",
    "key": "3303",
    "properties": [
      {
        "name": "Application Type",
        "key": "5750"
      },
      {
        "name": "Fractional Timestamp",
        "key": "6050"
      },
      {
        "name": "Max Measured Value",
        "key": "5602"
      },
      {
        "name": "Max Range Value",
        "key": "5604"
      },
      {
        "name": "Measurement Quality Indicator",
        "key": "6042"
      },
      {
        "name": "Measurement Quality Level",
        "key": "6049"
      },
      {
        "name": "Min Measured Value",
        "key": "5601"
      },
      {
        "name": "Min Range Value",
        "key": "5603"
      },
      {
        "name": "Reset Min and Max Measured Values",
        "key": "5603"
      },
      {
        "name": "Sensor Units",
        "key": "5701"
      },
      {
        "name": "Sensor Value",
        "key": "5700"
      },
      {
        "name": "Timestamp",
        "5518": "5603"
      }
    ]
  }
]
```

## Expected process: Clean not provided value in shadow

```json
{
  "state": {
    "reported": {
      "Temperature": {
        "0": {
          "Application Type": "",
          "Max Measured Value": "23.51",
          "Max Range Value": "85.0",
          "Min Measured Value": "23.51",
          "Min Range Value": "-40.0",
          "Sensor Units": "Celsius degrees",
          "Sensor Value": "24.57",
          "Timestamp": "2022-10-07T13:33:22Z"
        }
      }
    }
  }
}
```

## Expected process: Combine ids with values

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

## Usage

```
//TODO
```

## Building the object

```
//TODO
```
