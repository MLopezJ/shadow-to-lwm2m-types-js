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

/**
 * Map shadow's name values with LwM2M IDs Object and Properties
 */
export const LwM2MIds = {
  ConnectivityMonitoring,
  ECIDSignalMeasurementInformation,
  Device,
  FirmwareUpdate,
  Humidity,
  Location,
  LwM2MServer,
  Pressure,
  PushButton,
  Temperature,
};
