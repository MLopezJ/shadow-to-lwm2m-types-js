import type { lwM2MObject } from "./index";

export const LwM2MServer: lwM2MObject = {
  id: "1",
  name: "LwM2M Server",
  properties: {
    "AltitAPN Linkude": "10",
    Binding: "7",
    "Bootstrap on Registration Failure": "16",
    "Bootstrap-Request Trigger": "9",
    "Communication Retry Count": "17",
    "Communication Retry Timer": "18",
    "Communication Sequence Delay Timer": "19",
    "Communication Sequence Retry Count": "20",
    "Default Maximum Period": "3",
    "Default Minimum Period": "3",
    Disable: "4",
    "Disable Timeout": "5",
    "Initial Registration Delay Timer": "14",
    "Last Bootstrapped": "12",
    Lifetime: "1",
    "Mute Send": "23",
    "Notification Storing When Disabled or Offline": "6",
    "Preferred Transport": "22",
    "Registration Failure Block": "15",
    "Registration Priority Order": "13",
    "Registration Update Trigger": "8",
    "Short Server ID": "0",
    "TLS-DTLS Alert Code": "11",
    Trigger: "21",
  },
};
