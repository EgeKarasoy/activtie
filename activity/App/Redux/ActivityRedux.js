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
  activityCreateNameChange: ['activityCreateName'],
  activityCreateDescriptionChange: ['activityDescription'],
  activityCreateCategoryPickerValueChange: ['activityCreateCategoryPickerValue'],
  activityCreateUserNumberChange: ['activityCreateUserNumber'],
  activityCreateCityNameChange: ['activityCreateCityName'],
  activityCreateDateChange: ['activityCreateDate'],
  activityCreateTimeChange: ['activityCreateTime'],
  activityCreateErrorChange: ['activityCreateError'],
  getCityData: ['cityData'],
  getLatestActivityData: ['latestActivityData'],
  getActivityJoinData: ['activityJoinData'],
  joinRequestKeeper: ['joinRequest'],
  activityMessageRequestKeeper: ['activityMessageRequest'],
  getActivityProfileCardData: ['activityProfileCardData'],
  activityMessageChange: ['activityMessage'],
  activityMessageErrorChange: ['activityMessageError'],
  getCategoryData: ['categoryData'],
});

export const ActivityTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export type ActivityStateType = {
  isGoAllCities: boolean,
  isGoActivityJoin: boolean,
  isLoading: boolean,
  isGoActivityProfileCard: boolean,
  activityCreateName: ?string,
  activityCreateDescription: ?string,
  activityCreateCategoryPickerValue: ?string,
  activityCreateUserNumber: ?string,
  activityCreateCityName: ?string,
  activityCreateDate: ?string,
  activityCreateTime: ?string,
  activityCreateError: ?string,
  cityData: Array< mixed >,
  latestActivityData: Array< mixed >,
  activityId: ?string,
  activityJoinData: Array< mixed >,
  joinRequest: ?string,
  activityMessageRequest: ?string,
  creatorId: ?string,
  activityProfileCardData: Array< mixed >,
  activityMessage: ?string,
  activityMessageError: ?string,
  categoryData: Array< mixed >
};

export const INITIAL_STATE: ActivityStateType = ({
  isGoAllCities: false,
  isGoActivityJoin: false,
  isLoading: true,
  isGoActivityProfileCard: false,
  activityCreateName: '',
  activityCreateDescription: '',
  activityCreateCategoryPickerValue: '',
  activityCreateUserNumber: '',
  activityCreateCityName: '',
  activityCreateDate: '',
  activityCreateTime: '',
  activityCreateError: '',
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
  categoryData: [],
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

const activityCreateNameChange = (
  state: ActivityStateType,
  { activityCreateName }: Object,
): ActivityStateType => Object.assign({}, state, { activityCreateName });

const activityCreateDescriptionChange = (
  state: ActivityStateType,
  { activityCreateDescription }: Object,
): ActivityStateType => Object.assign({}, state, { activityCreateDescription });

const activityCreateCategoryPickerValueChange = (
  state: ActivityStateType,
  { activityCreateCategoryPickerValue }: Object,
): ActivityStateType => Object.assign({}, state, { activityCreateCategoryPickerValue });

const activityCreateUserNumberChange = (
  state: ActivityStateType,
  { activityCreateUserNumber }: Object,
): ActivityStateType => Object.assign({}, state, { activityCreateUserNumber });

const activityCreateCityNameChange = (
  state: ActivityStateType,
  { activityCreateCityName }: Object,
): ActivityStateType => Object.assign({}, state, { activityCreateCityName });

const activityCreateDateChange = (
  state: ActivityStateType,
  { activityCreateDate }: Object,
): ActivityStateType => Object.assign({}, state, { activityCreateDate });

const activityCreateTimeChange = (
  state: ActivityStateType,
  { activityCreateTime }: Object,
): ActivityStateType => Object.assign({}, state, { activityCreateTime });

const activityCreateErrorChange = (
  state: ActivityStateType,
  { activityCreateError }: Object,
): ActivityStateType => Object.assign({}, state, { activityCreateError });

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

const getCategoryData = (
  state: ActivityStateType,
  { categoryData }: Object,
): ActivityStateType => Object.assign({}, state, { categoryData });

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
  [Types.ACTIVITY_CREATE_NAME_CHANGE]: activityCreateNameChange,
  [Types.ACTIVITY_CREATE_DESCRIPTION_CHANGE]: activityCreateDescriptionChange,
  [Types.ACTIVITY_CREATE_CATEGORY_PICKER_VALUE_CHANGE]: activityCreateCategoryPickerValueChange,
  [Types.ACTIVITY_CREATE_USER_NUMBER_CHANGE]: activityCreateUserNumberChange,
  [Types.ACTIVITY_CREATE_CITY_NAME_CHANGE]: activityCreateCityNameChange,
  [Types.ACTIVITY_CREATE_DATE_CHANGE]: activityCreateDateChange,
  [Types.ACTIVITY_CREATE_TIME_CHANGE]: activityCreateTimeChange,
  [Types.ACTIVITY_CREATE_ERROR_CHANGE]: activityCreateErrorChange,
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
  [Types.GET_CATEGORY_DATA]: getCategoryData,
});

/* ------------- Selectors ------------- */
