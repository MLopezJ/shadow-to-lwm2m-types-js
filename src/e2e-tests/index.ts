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

  // An object with relationship between names and ids should be provided
  __.assertThat(equivalentIds, __.is(__.defined()));

  const expectedResult = {
    "10256": [{ "5": 0 }, { "5": 23 }, { "5": 23 }],
    "4:1.3@1.1": [{ "1": ["6", "7"], "2": "-96", "4": ["10.160.225.39"] }],
    "3303:1.1": [{ "5602": 23.51 }],
  };

  __.assertThat(await main(shadow, equivalentIds as any), __.equalTo(expectedResult)); 
  
};

execution();
