// @flow

import { createReducer, createActions } from 'reduxsauce';
// import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export type NodeType = {
  type: string,
  orderNo: number,
  name: string,
  passingTime: ?string
};

export type PositionDataType = {
  latitude: ?number,
  longitude: ?number
};

export type RoadType = {
  roadName: string,
  passingTime: ?string,
  nodes: Array< NodeType >,
  position: PositionDataType
};

const roadInitial: RoadType = {
  roadName: 'Cesme - Izmir',
  passingTime: '2018-03-22T13:25:43.511Z',
  position: { latitude: 37.78, longitude: -122.4 },
  nodes: [
    {
      type: 'gate',
      orderNo: 1,
      name: 'Güzelbahçe',
      passingTime: '2018-03-13T18:25:43.511Z',
    },
    {
      type: 'vehicle',
      orderNo: 2,
      name: "Kayhan's car",
      passingTime: null,
    },
    {
      type: 'gate',
      orderNo: 3,
      name: 'Urla',
      passingTime: null,
    },
    {
      type: 'gate',
      orderNo: 4,
      name: 'Karaburun',
      passingTime: null,
    },
    {
      type: 'gate',
      orderNo: 5,
      name: 'Alacati',
      passingTime: null,
    },
    {
      type: 'gate',
      orderNo: 6,
      name: 'Cesme',
      passingTime: null,
    },
  ],
};

const { Types, Creators } = createActions({
  setTime: ['monitorId', 'time'],
  updateRoad: ['road'],
  updatePosition: ['position'],
});

export const GateMonitorTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export type GateMonitorType = {
  monitorId: string,
  name: string,
  passingTime: ?string
};

type SetTimeType = {
  monitorId: string,
  name: string
};

export type GateMonitorsStateType = {
  road: RoadType,
  gateMonitors: Array< GateMonitorType >
};

const INITIAL_STATE: GateMonitorsStateType = {
  road: roadInitial,
  gateMonitors: [],
};

/* --------------Common State Functions---------- */

const findGateMonitor = (
  state: GateMonitorsStateType,
  monitorId: string,
): ?GateMonitorType =>
  state.gateMonitors.find((gatemonitor: GateMonitorType): boolean =>
    gatemonitor.monitorId === monitorId);

export const GetTimeValueOfMonitor = (
  state: GateMonitorsStateType,
  monitorId: string,
): ?string => {
  const foundGateMonitor: ?GateMonitorType = findGateMonitor(state, monitorId);
  if (foundGateMonitor != null) {
    return foundGateMonitor.name;
  }
  return null;
};
/* ------------- Reducers ------------- */

const setTime = (
  state: GateMonitorsStateType,
  { monitorId, name }: SetTimeType,
): GateMonitorsStateType => {
  const foundGateMonitor = findGateMonitor(state, monitorId);

  if (foundGateMonitor === undefined) {
    state.gateMonitors.push({ monitorId, name, passingTime: null });
  }

  const gateMonitors: Array< GateMonitorType > = state.gateMonitors.map((gatemonitor: GateMonitorType): GateMonitorType => {
    let result: GateMonitorType;
    if (monitorId.localeCompare(gatemonitor.monitorId) === 0) {
      result = Object.assign({}, gatemonitor, {
        name,
      });
    } else {
      result = gatemonitor;
    }
    return result;
  });
  return {
    ...state,
    gateMonitors,
  };
};

const updateRoad = (
  state: GateMonitorsStateType,
  { road }: Object,
): GateMonitorsStateType => ({
  ...state,
  road,
});

const updatePosition = (
  state: GateMonitorsStateType,
  action: Object,
): GateMonitorsStateType => {
  const { position } = action;
  const road = { ...state.road, position };
  return {
    ...state,
    road,
  };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_TIME]: setTime,
  [Types.UPDATE_ROAD]: updateRoad,
  [Types.UPDATE_POSITION]: updatePosition,
});

/* ------------- Selectors ------------- */
