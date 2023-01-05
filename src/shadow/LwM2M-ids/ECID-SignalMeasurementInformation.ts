import type { lwM2MObject } from "./index";

export const ECIDSignalMeasurementInformation: lwM2MObject = {
  id: "10256",
  name: "ECID-Signal Measurement Information",
  properties: {
    physCellId: "0",
    ECGI: "1",
    arfcnEUTRA: "2",
    "rsrp-Result": "3",
    "rsrq-Result": "4",
    "ue-RxTxTimeDiff": "5",
  },
};
