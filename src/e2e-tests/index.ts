import { main } from "./../index";
import __ from 'hamjest';

const shadow = {
  state: {
    reported: {
      "Connectivity Monitoring": {
        "0": {
          "Radio Signal Strength": "-96",
          "IP Addresses": {
            "0": "10.160.225.39",
          },
          "Available Network Bearer": {
            "0": "6",
            "1": "7",
          },
        },
      },
      "ECID-Signal Measurement Information": {
        "0": {
          "ue-RxTxTimeDiff": "0",
        },
        "1": {
          "ue-RxTxTimeDiff": "23",
        },
        "2": {
          "ue-RxTxTimeDiff": "23",
        },
      },
      Temperature: {
        "0": {
          "Application Type": "",
          "Fractional Timestamp": {
            noValue: true,
          },
          "Max Measured Value": "23.51",
        },
      },
    },
  },
};

const jsonSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  $id: "https://github.com/NordicSemiconductor/lwm2m-types-js/blob/saga/LwM2MDocument.schema.json",
  title: "LwM2M JSON Schema",
  description: "JSON schema for expressing LwM2M resources as JSON",
  properties: {
    "3303:1.1": {
      type: "array",
      minItems: 1,
      title: "Temperature",
      description:
        "This IPSO object should be used with a temperature sensor to report a temperature measurement.  It also provides resources for minimum/maximum measured values and the minimum/maximum range that can be measured by the temperature sensor. An example measurement unit is degrees Celsius. LWM2MVersion: 1.0 ObjectVersion: 1.1 MultipleInstances: true Mandatory: false",
      items: {
        type: "object",
        $id: "https://github.com/OpenMobileAlliance/lwm2m-registry/raw/prod/3303.xml",
        title: "Temperature",
        description:
          "This IPSO object should be used with a temperature sensor to report a temperature measurement.  It also provides resources for minimum/maximum measured values and the minimum/maximum range that can be measured by the temperature sensor. An example measurement unit is degrees Celsius. LWM2MVersion: 1.0 ObjectVersion: 1.1 MultipleInstances: true Mandatory: false",
        properties: {
          "5602": {
            type: "number",
            title: "Max Measured Value",
            description:
              "The maximum value measured by the sensor since power ON or reset.",
          },
          "5750": {
            type: "string",
            title: "Application Type",
            description:
              "The application type of the sensor or actuator as a string depending on the use case.",
          },
          "6050": {
            type: "number",
            title: "Fractional Timestamp",
            description:
              "Fractional part of the timestamp when sub-second precision is used (e.g., 0.23 for 230 ms). Units: s.",
          },
        },
        required: ["5602"],
      },
    },
    "10256": {
      type: "array",
      minItems: 1,
      title: "ECID-Signal Measurement Information",
      description:
        "This LWM2M Object provides ECID signal measurements of a device. LWM2MVersion: 1.0 ObjectVersion: 1.0 MultipleInstances: true Mandatory: false",
      items: {
        type: "object",
        $id: "https://github.com/OpenMobileAlliance/lwm2m-registry/raw/prod/10256.xml",
        title: "ECID-Signal Measurement Information",
        description:
          "This LWM2M Object provides ECID signal measurements of a device. LWM2MVersion: 1.0 ObjectVersion: 1.0 MultipleInstances: true Mandatory: false",
        properties: {
          "5": {
            type: "integer",
            title: "ue-RxTxTimeDiff",
            description:
              "This field specifies the UE Rx-Tx time difference measurement. Units: \r\n        .",
          },
        },
        required: ["5"],
      },
    },
    "4:1.3@1.1": {
      type: "object",
      $id: "https://github.com/OpenMobileAlliance/lwm2m-registry/raw/prod/4.xml",
      title: "Connectivity Monitoring",
      description:
        "This LwM2M Object enables monitoring of parameters related to network connectivity.\r\nIn this general connectivity Object, the Resources are limited to the most general cases common to most network bearers. It is recommended to read the description, which refers to relevant standard development organizations (e.g. 3GPP, IEEE).\r\nThe goal of the Connectivity Monitoring Object is to carry information reflecting the more up to date values of the current connection for monitoring purposes. Resources such as Link Quality, Radio Signal Strength, Cell ID are retrieved during connected mode at least for cellular networks. LWM2MVersion: 1.1 ObjectVersion: 1.3 MultipleInstances: false Mandatory: false",
      properties: {
        "1": {
          type: "array",
          minItems: 1,
          items: { type: "integer", minimum: 0, maximum: 50 },
          title: "Available Network Bearer",
          description:
            "Indicates a list of current available network bearer. Each Resource Instance has a value from the network bearer list.",
        },
        "2": {
          type: "integer",
          title: "Radio Signal Strength",
          description:
            "Indicates the average value of the received signal strength indication used in the\r\ncurrent network bearer (as indicated by Resource 0 of this Object). The value is expressed in dBm. For the following network bearers the signal strength parameters indicated below are represented by this resource:\r\nGSM:    RSSI\r\nUMTS:   RSCP\r\nLTE:    RSRP\r\nNB-IoT: NRSRP\r\nFor more details on Network Measurement Report, refer to the appropriate Cellular or Wireless Network standards, (e.g. for LTE Cellular Network\r\nrefer to 3GPP TS 36.133 specification).",
        },
        "4": {
          type: "array",
          minItems: 1,
          items: { type: "string" },
          title: "IP Addresses",
          description:
            "The IP addresses assigned to the connectivity interface. (e.g. IPv4, IPv6, etc.)",
        },
      },
      required: ["1", "2", "4"],
    },
  },
};

const equivalentIds = {
  "Connectivity Monitoring": {
    id: "4",
    name: "Connectivity Monitoring",
    properties: {
      "Radio Signal Strength": "2",
      "Available Network Bearer": "1",
      "IP Addresses": "4",
    },
  },
  "ECID-Signal Measurement Information": {
    id: "10256",
    name: "ECID-Signal Measurement Information",
    properties: {
      "ue-RxTxTimeDiff": "5",
    },
  },
  Temperature: {
    id: "3303",
    name: "Temperature",
    properties: {
      "Application Type": "5750",
      "Fractional Timestamp": "6050",
      "Max Measured Value": "5602",
    },
  },
};

const execution = async () => {

  // shadow should be defined
  __.assertThat(shadow, __.is(__.defined()));

  // json shcema should be provided
  __.assertThat(jsonSchema, __.is(__.defined()));

  // An object with relationship between names and ids should be provided
  __.assertThat(equivalentIds, __.is(__.defined()));

  const expectedResult = {
    "10256": [{ "5": 0 }, { "5": 23 }, { "5": 23 }],
    "4:1.3@1.1": [{ "1": ["6", "7"], "2": "-96", "4": ["10.160.225.39"] }],
    "3303:1.1": [{ "5602": 23.51 }],
  };

  __.assertThat(await main(shadow, jsonSchema, equivalentIds as any), __.equalTo(expectedResult)); 
  
};

execution();
