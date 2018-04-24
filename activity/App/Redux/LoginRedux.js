// @flow

import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import type User from 'firebase';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: null,
  loginSuccess: ['user'],
  loginFailure: ['error'],
  logout: null,
  usernameChange: ['username'],
  nameChange: ['name'],
  passwordChange: ['password'],
  facebookLoginSuccess: ['value'],
  registerBegin: null,
  registerComplated: null,
  forgotPasswordBegin: null,
  forgotPasswordComplated: null,
});

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export type LoginStateType = {
  user: ?User,
  error: ?string,
  fetching: boolean,
  username: ?string,
  name: ?string,
  password: ?string,
  value: ?string,
  isRegistering: boolean,
  isForgot: boolean
};

export const INITIAL_STATE: LoginStateType = Immutable(({
  user: null,
  error: '',
  fetching: false,
  username: '',
  name: '',
  password: '',
  value: '',
  isRegistering: false,
  isForgot: false,
}: LoginStateType));

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: LoginStateType): LoginStateType =>
  Object.assign({}, state, { fetching: true });

// we've successfully logged in
const success = (state: LoginStateType, { user }: Object): LoginStateType =>
  Object.assign({}, state, { fetching: false, error: '', user });

// we've had a problem logging in
const failure = (state: LoginStateType, { error }: Object): LoginStateType =>
  Object.assign({}, state, {
    fetching: false,
    error,
    password: '',
  });

// we've logged out
const logout = (): LoginStateType => INITIAL_STATE;

const usernameChange = (
  state: LoginStateType,
  { username }: Object,
): LoginStateType => Object.assign({}, state, { username });

const nameChange = (state: LoginStateType, { name }: Object): LoginStateType =>
  Object.assign({}, state, { name });

const passwordChange = (
  state: LoginStateType,
  { password }: Object,
): LoginStateType => Object.assign({}, state, { password });

const facebookLoginSuccess = (
  state: LoginStateType,
  { value }: Object,
): LoginStateType => Object.assign({}, state, { value });

const registerBegin = (state: LoginStateType): LoginStateType =>
  Object.assign({}, state, { isRegistering: true });
const registerComplated = (state: LoginStateType): LoginStateType =>
  Object.assign({}, state, INITIAL_STATE);

const forgotPasswordBegin = (state: LoginStateType): LoginStateType =>
  Object.assign({}, state, { isForgot: true });
const forgotPasswordComplated = (state: LoginStateType): LoginStateType =>
  Object.assign({}, state, { isForgot: false });
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout,
  [Types.USERNAME_CHANGE]: usernameChange,
  [Types.NAME_CHANGE]: nameChange,
  [Types.PASSWORD_CHANGE]: passwordChange,
  [Types.FACEBOOK_LOGIN_SUCCESS]: facebookLoginSuccess,
  [Types.REGISTER_BEGIN]: registerBegin,
  [Types.REGISTER_COMPLATED]: registerComplated,
  [Types.FORGOT_PASSWORD_BEGIN]: forgotPasswordBegin,
  [Types.FORGOT_PASSWORD_COMPLATED]: forgotPasswordComplated,
  // [Types.REGISTER_REQUEST]: registerRequest,
});

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: LoginStateType): boolean =>
  loginState.user !== null;
