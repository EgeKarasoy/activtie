// @flow

import { takeLatest } from 'redux-saga/effects';

// import API from '../Services/Api'
// import FixtureAPI from '../Services/FixtureApi'
// import DebugSettings from '../Config/DebugSettings'
// import SportcialApi from '../Services/sportcial/SportcialApi'

/* ------------- Types ------------- */

// import { StartupTypes } from '../Redux/StartupRedux'
// import { TemperatureTypes } from '../Redux/TemperatureRedux'
import { LoginTypes, RegisterTypes } from '../Redux/LoginRedux';
// import { OpenScreenTypes } from '../Redux/OpenScreenRedux'
// import { EventsActionTypes } from '../Redux/sportcial/EventsRedux'

/* ------------- Sagas ------------- */

// import { startup } from './StartupSagas'
import login from './LoginSagas';
import register from './RegisterSagas';
// import { getTemperature } from './TemperatureSagas'
// import { openScreen } from './OpenScreenSagas'
// import { getEvents } from './sportcial/EventSagas'
// import AppConfig from '../Config/AppConfig'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const api = DebugSettings.useFixtures ? FixtureAPI : API.create()

// const sportcialApi = SportcialApi.create(AppConfig.sportcialApiURL)

/* ------------- Connect Types To Sagas ------------- */

const rootSaga = function* root(): Generator< Array< mixed >, void, void > {
  yield [
    // some sagas only receive an action
    // takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(LoginTypes.LOGIN_REQUEST, login),
    takeLatest(LoginTypes.LOGIN_REQUEST, register),
    // takeLatest(OpenScreenTypes.OPEN_SCREEN, openScreen),
    // // some sagas receive extra parameters in addition to an action
    // takeLatest(TemperatureTypes.TEMPERATURE_REQUEST, getTemperature, api),
    // // Sportcial related Sagas
    // takeLatest(EventsActionTypes.SEARCH_STARTED, getEvents, sportcialApi)
  ];
};

export default rootSaga;
