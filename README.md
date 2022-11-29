# shadow-to-lwm2m-types-js

Generate a [LwM2M Object](https://github.com/NordicSemiconductor/lwm2m-types-js) from a given shadow.

This is usefull to transform a shadow to [LwM2M Object](https://github.com/NordicSemiconductor/lwm2m-types-js) format

## Installation

```bash
npm ci
npm test
```

## Expected Input

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

## Usage

```
//TODO
```

## Building the object

```
//TODO
```
