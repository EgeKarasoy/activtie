// @flow

import { createReducer, createActions } from 'reduxsauce';
// import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  goActivity: null,
  goActivityCompleted: null,
  goProfileCard: null,
  goProfileCardCompleted: null,
  getProfileMessagesData: ['profileMessagesData'],
});

export const ProfileTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export type ProfileStateType = {
  isGoActivity: boolean,
  isGoProfileCard: boolean,
  profileMessagesData: Array< mixed >
};

export const INITIAL_STATE: ProfileStateType = ({
  isGoActivity: false,
  isGoProfileCard: false,
  profileMessagesData: [],
}: ProfileStateType);

/* ------------- Reducers ------------- */

const goActivity = (state: ProfileStateType): ProfileStateType =>
  Object.assign({}, state, { isGoActivity: true });

const goActivityCompleted = (state: ProfileStateType): ProfileStateType =>
  Object.assign({}, state, { isGoActivity: false });

const goProfileCard = (
  state: ProfileStateType,
  { activityId }: Object,
): ProfileStateType =>
  Object.assign({}, state, {
    isGoProfileCard: true,
    activityId,
  });

const goProfileCardCompleted = (state: ProfileStateType): ProfileStateType =>
  Object.assign({}, state, { isGoProfileCard: false });

const getProfileMessagesData = (
  state: ProfileStateType,
  { profileMessagesData }: Object,
): ProfileStateType => Object.assign({}, state, { profileMessagesData });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GO_ACTIVITY]: goActivity,
  [Types.GO_ACTIVITY_COMPLETED]: goActivityCompleted,
  [Types.GO_PROFILE_CARD]: goProfileCard,
  [Types.GO_PROFILE_CARD_COMPLETED]: goProfileCardCompleted,
  [Types.GET_PROFILE_MESSAGES_DATA]: getProfileMessagesData,
});

/* ------------- Selectors ------------- */
