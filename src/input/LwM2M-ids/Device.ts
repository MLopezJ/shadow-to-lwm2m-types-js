import type { lwM2MObject } from "./index";

export const Device: lwM2MObject = {
  id: "3",
  name: "Device",
  properties: {
    "Available Power Sources": "6",
    "Error Code": "11",
    ExtDevInfo: "22",
    "Power Source Current": "8",
    "Power Source Voltage": "7",
    "Battery Level": "9",
    "Battery Status": "20",
    "Current Time": "13",
    "Device Type": "17",
    "Factory Reset": "5",
    "Firmware Version": "3",
    "Hardware Version": "18",
    Manufacturer: "0",
    "Memory Free": "10",
    "Memory Total": "21",
    "Model Number": "1",
    Reboot: "4",
    "Reset Error Code": "12",
    "Serial Number": "12",
    "Software Version": "19",
    "Supported Binding and Modes": "16",
    Timezone: "15",
    "UTC Offset": "14",
  },
};
