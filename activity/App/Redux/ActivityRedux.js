// @flow

import { createReducer, createActions } from 'reduxsauce';
// import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  goAllCities: null,
  goAllCitiesCompleted: null,
  goActivityJoin: ['activityId'],
  goActivityJoinCompleted: null,
  goActivityProfileCard: ['creatorId'],
  goActivityProfileCardCompleted: null,
  loading: null,
  loadingCompleted: null,
  activityNameChange: ['activityName'],
  activityDescriptionChange: ['activityDescription'],
  categoryPickerValueChange: ['categoryPickerValue'],
  userNumberChange: ['userNumber'],
  getCityData: ['cityData'],
  getLatestActivityData: ['latestActivityData'],
  getActivityJoinData: ['activityJoinData'],
  joinRequestKeeper: ['joinRequest'],
  activityMessageRequestKeeper: ['activityMessageRequest'],
  getActivityProfileCardData: ['activityProfileCardData'],
  activityMessageChange: ['activityMessage'],
  activityMessageErrorChange: ['activityMessageError'],
});

export const ActivityTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export type ActivityStateType = {
  isGoAllCities: boolean,
  isGoActivityJoin: boolean,
  isLoading: boolean,
  isGoActivityProfileCard: boolean,
  activityName: ?string,
  activityDescription: ?string,
  categoryPickerValue: ?string,
  userNumber: ?number,
  cityData: Array< mixed >,
  latestActivityData: Array< mixed >,
  activityId: ?string,
  activityJoinData: Array< mixed >,
  joinRequest: ?string,
  activityMessageRequest: ?string,
  creatorId: ?string,
  activityProfileCardData: Array< mixed >,
  activityMessage: ?string,
  activityMessageError: ?string
};

export const INITIAL_STATE: ActivityStateType = ({
  isGoAllCities: false,
  isGoActivityJoin: false,
  isLoading: true,
  isGoActivityProfileCard: false,
  activityName: '',
  activityDescription: '',
  categoryPickerValue: '',
  userNumber: 2,
  cityData: [],
  latestActivityData: [],
  activityId: '',
  activityJoinData: [],
  joinRequest: '',
  activityMessageRequest: '',
  creatorId: '',
  activityProfileCardData: [],
  activityMessage: '',
  activityMessageError: '',
}: ActivityStateType);

/* ------------- Reducers ------------- */

const goAllCities = (state: ActivityStateType): ActivityStateType =>
  Object.assign({}, state, { isGoAllCities: true });

const goAllCitiesCompleted = (state: ActivityStateType): ActivityStateType =>
  Object.assign({}, state, { isGoAllCities: false });

const loading = (state: ActivityStateType): ActivityStateType =>
  Object.assign({}, state, { isLoading: true });

const loadingCompleted = (state: ActivityStateType): ActivityStateType =>
  Object.assign({}, state, { isLoading: false });

const activityNameChange = (
  state: ActivityStateType,
  { activityName }: Object,
): ActivityStateType => Object.assign({}, state, { activityName });

const activityDescriptionChange = (
  state: ActivityStateType,
  { activityDescription }: Object,
): ActivityStateType => Object.assign({}, state, { activityDescription });

const categoryPickerValueChange = (
  state: ActivityStateType,
  { categoryPickerValue }: Object,
): ActivityStateType => Object.assign({}, state, { categoryPickerValue });

const userNumberChange = (
  state: ActivityStateType,
  { userNumber }: Object,
): ActivityStateType => Object.assign({}, state, { userNumber });

const getCityData = (
  state: ActivityStateType,
  { cityData }: Object,
): ActivityStateType => Object.assign({}, state, { cityData });

const getLatestActivityData = (
  state: ActivityStateType,
  { latestActivityData }: Object,
): ActivityStateType => Object.assign({}, state, { latestActivityData });

const getActivityJoinData = (
  state: ActivityStateType,
  { activityJoinData }: Object,
): ActivityStateType => Object.assign({}, state, { activityJoinData });

const getActivityProfileCardData = (
  state: ActivityStateType,
  { activityProfileCardData }: Object,
): ActivityStateType => Object.assign({}, state, { activityProfileCardData });

const joinRequestKeeper = (
  state: ActivityStateType,
  { joinRequest }: Object,
): ActivityStateType => Object.assign({}, state, { joinRequest });

const activityMessageRequestKeeper = (
  state: ActivityStateType,
  { activityMessageRequest }: Object,
): ActivityStateType => Object.assign({}, state, { activityMessageRequest });

const activityMessageChange = (
  state: ActivityStateType,
  { activityMessage }: Object,
): ActivityStateType => Object.assign({}, state, { activityMessage });

const activityMessageErrorChange = (
  state: ActivityStateType,
  { activityMessageError }: Object,
): ActivityStateType => Object.assign({}, state, { activityMessageError });

const goActivityJoin = (
  state: ActivityStateType,
  { activityId }: Object,
): ActivityStateType =>
  Object.assign({}, state, {
    isGoActivityJoin: true,
    activityId,
  });

const goActivityProfileCard = (
  state: ActivityStateType,
  { creatorId }: Object,
): ActivityStateType =>
  Object.assign({}, state, {
    isGoActivityProfileCard: true,
    creatorId,
  });

const goActivityJoinCompleted = (state: ActivityStateType): ActivityStateType =>
  Object.assign({}, state, { isGoActivityJoin: false });

const goActivityProfileCardCompleted = (state: ActivityStateType): ActivityStateType =>
  Object.assign({}, state, { isGoActivityProfileCard: false });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GO_ALL_CITIES]: goAllCities,
  [Types.GO_ALL_CITIES_COMPLETED]: goAllCitiesCompleted,
  [Types.LOADING]: loading,
  [Types.LOADING_COMPLETED]: loadingCompleted,
  [Types.ACTIVITY_NAME_CHANGE]: activityNameChange,
  [Types.ACTIVITY_DESCRIPTION_CHANGE]: activityDescriptionChange,
  [Types.CATEGORY_PICKER_VALUE_CHANGE]: categoryPickerValueChange,
  [Types.USER_NUMBER_CHANGE]: userNumberChange,
  [Types.GET_CITY_DATA]: getCityData,
  [Types.GET_LATEST_ACTIVITY_DATA]: getLatestActivityData,
  [Types.GET_ACTIVITY_JOIN_DATA]: getActivityJoinData,
  [Types.GO_ACTIVITY_JOIN]: goActivityJoin,
  [Types.GO_ACTIVITY_JOIN_COMPLETED]: goActivityJoinCompleted,
  [Types.JOIN_REQUEST_KEEPER]: joinRequestKeeper,
  [Types.GO_ACTIVITY_PROFILE_CARD]: goActivityProfileCard,
  [Types.GO_ACTIVITY_PROFILE_CARD_COMPLETED]: goActivityProfileCardCompleted,
  [Types.GET_ACTIVITY_PROFILE_CARD_DATA]: getActivityProfileCardData,
  [Types.ACTIVITY_MESSAGE_CHANGE]: activityMessageChange,
  [Types.ACTIVITY_MESSAGE_ERROR_CHANGE]: activityMessageErrorChange,
  [Types.ACTIVITY_MESSAGE_REQUEST_KEEPER]: activityMessageRequestKeeper,
});

/* ------------- Selectors ------------- */
