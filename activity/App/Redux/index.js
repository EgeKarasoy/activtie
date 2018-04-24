// @flow

import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from '../Sagas';
import { reducer as gateMonitorReducer } from './GateMonitorRedux';
import type { GateMonitorsStateType } from './GateMonitorRedux';
import { reducer as loginReducer } from './LoginRedux';
import type { LoginStateType } from './LoginRedux';
import { reducer as profileReducer } from './ProfileRedux';
import type { ProfileStateType } from './ProfileRedux';
import { reducer as activityReducer } from './ActivityRedux';
import type { ActivityStateType } from './ActivityRedux';


export type StateType = {
  gatemonitor: GateMonitorsStateType,
  login: LoginStateType,
  profile: ProfileStateType,
  activity: ActivityStateType
};

export default (): mixed => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    // temperature: require('./TemperatureRedux').reducer,
    gatemonitor: gateMonitorReducer,
    login: loginReducer,
    profile: profileReducer,
    activity: activityReducer,
    // search: require('./SearchRedux').reducer,
    // events: require('./sportcial/EventsRedux').reducer
  });

  return configureStore(rootReducer, rootSaga);
};
