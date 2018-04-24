// @flow

import { createReducer, createActions } from 'reduxsauce';
// import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  goActivity: null,
});

export const ProfileTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export type ProfileStateType = {
  isGoActivity: boolean
};

export const INITIAL_STATE: ProfileStateType = ({
  isGoActivity: false,
}: ProfileStateType);

/* ------------- Reducers ------------- */

const goActivity = (state: ProfileStateType): ProfileStateType =>
  Object.assign({}, state, { isGoActivity: true });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GO_ACTIVITY]: goActivity,
});

/* ------------- Selectors ------------- */
