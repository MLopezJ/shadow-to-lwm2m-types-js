/**
 * { state: { reported: {...} } }
 */
export type ReceivedShadow = {
  state: {
    reported: ShadowObject;
  };
};

/**
 * "Connectivity Monitoring": {...}
 */
export type ShadowObject = Record<string, mapId>;

/**
 * "0": {...}
 */
export type mapId = Record<string, props>;

/**
 *
 * {"SMNC": "1"}
 * {"Router IP Addresses": {}},
 *
 */
export type props = Record<string, value>;

export type value = providedValue | notProvidedValue;

export type notProvidedValue = noValue | {} | ""

export type providedValue = propMap | string

/**
 * {"noValue": true}
 */
export type noValue = {
  noValue: boolean;
};

/**
 *  {"0": "ibasis.iot"}
 */
export type propMap = Record<string, string>;
