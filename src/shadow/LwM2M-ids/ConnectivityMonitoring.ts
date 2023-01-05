import type { lwM2MObject } from "./index";

export const ConnectivityMonitoring: lwM2MObject = {
  id: "4",
  name: "Connectivity Monitoring",
  properties: {
    "Radio Signal Strength": "2",
    "Cell ID": "8",
    SMNC: "9",
    SMCC: "10",
    LAC: "12",
    APN: "7",
    "Available Network Bearer": "1",
    "IP Addresses": "4",
    "Router IP Addresses": "5",
    "Link Quality": "3",
    "Network Bearer": "0",
    SignalSNR: "11",
  },
};
