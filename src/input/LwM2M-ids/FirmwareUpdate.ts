import type { lwM2MObject } from "./index";

export const FirmwareUpdate: lwM2MObject = {
  id: "5",
  name: "Firmware Update",
  properties: {
    "Firmware Update Protocol Support": "8",
    "Firmware Update Delivery Method": "9",
    Package: "0",
    "Package URI": "1",
    PkgName: "6",
    PkgVersion: "7",
    State: "3",
    Update: "2",
    "Update Result": "5",
  },
};
