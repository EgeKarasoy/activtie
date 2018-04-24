// @flow

import { createReducer, createActions } from 'reduxsauce';
// import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  goActivity: null,
  goActivityCompleted: null,
  goProfileCard: null,
  goProfileCardCompleted: null,
});

export const ProfileTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export type ProfileStateType = {
  isGoActivity: boolean,
  isGoProfileCard: boolean
};

export const INITIAL_STATE: ProfileStateType = ({
  isGoActivity: false,
  isGoProfileCard: false,
}: ProfileStateType);

/* ------------- Reducers ------------- */

const goActivity = (state: ProfileStateType): ProfileStateType =>
  Object.assign({}, state, { isGoActivity: true });

const goActivityCompleted = (state: ProfileStateType): ProfileStateType =>
  Object.assign({}, state, { isGoActivity: false });

const goProfileCard = (state: ProfileStateType): ProfileStateType =>
  Object.assign({}, state, { isGoProfileCard: true });

const goProfileCardCompleted = (state: ProfileStateType): ProfileStateType =>
  Object.assign({}, state, { isGoProfileCard: false });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GO_ACTIVITY]: goActivity,
  [Types.GO_ACTIVITY_COMPLETED]: goActivityCompleted,
  [Types.GO_PROFILE_CARD]: goProfileCard,
  [Types.GO_PROFILE_CARD_COMPLETED]: goProfileCardCompleted,
});

/* ------------- Selectors ------------- */
