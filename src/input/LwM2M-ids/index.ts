import { ConnectivityMonitoring } from "./ConnectivityMonitoring";
import { ECIDSignalMeasurementInformation } from "./ECID-SignalMeasurementInformation";
import { Device } from "./Device";
import { FirmwareUpdate } from "./FirmwareUpdate";
import { Humidity } from "./Humidity";
import { Location } from "./Location";
import { LwM2MServer } from "./LwM2MServer";
import { Pressure } from "./Pressure";
import { PushButton } from "./PushButton";
import { Temperature } from "./Temperature";

type props = Record<string, string>

export type lwM2MObject = {
  id: string, 
  name:string,
  properties: props
}

export interface LwM2MTypes {
  "Connectivity Monitoring": lwM2MObject;
  "ECID-Signal Measurement Information": lwM2MObject;
  Device: lwM2MObject;
  "Firmware Update": lwM2MObject;
  Humidity: lwM2MObject;
  Location: lwM2MObject;
  "LwM2M Server": lwM2MObject;
  Pressure: lwM2MObject;
  "Push button": lwM2MObject;
  Temperature: lwM2MObject;
}

/**
 * Map shadow's name values with LwM2M IDs Object and Properties
 */
export const LwM2MIds = {
  "Connectivity Monitoring": ConnectivityMonitoring,
  "ECID-Signal Measurement Information": ECIDSignalMeasurementInformation,
  Device,
  "Firmware Update": FirmwareUpdate,
  Humidity,
  Location,
  "LwM2M Server": LwM2MServer,
  Pressure,
  "Push button": PushButton,
  Temperature,
};
