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
  userReset: null,
  usernameChange: ['username'],
  nameChange: ['name'],
  surnameChange: ['surname'],
  passwordChange: ['password'],
  facebookLoginSuccess: ['value'],
  registerBegin: null,
  registerComplated: null,
  forgotPasswordBegin: null,
  forgotPasswordComplated: null,
  registerOutputChange: ['registerOutput'],
  userIdChange: ['userId'],
  usernameErrorChange: ['usernameError'],
  nameErrorChange: ['nameError'],
  surnameErrorChange: ['surnameError'],
  passwordErrorChange: ['passwordError'],
  loginUsernameChange: ['loginUsername'],
  loginPasswordChange: ['loginPassword'],
  forgotUsernameChange: ['forgotUsername'],
  pictureChange: ['picture'],
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
  surname: ?string,
  password: ?string,
  value: ?string,
  isRegistering: boolean,
  isForgot: boolean,
  registerOutput: Array< ?string >,
  userId: ?string,
  usernameError: ?string,
  nameError: ?string,
  surnameError: ?string,
  passwordError: ?string,
  loginUsername: ?string,
  loginPassword: ?string,
  forgotUsername: ?string,
  picture: ?string
};

export const INITIAL_STATE: LoginStateType = Immutable(({
  user: null,
  error: '',
  fetching: false,
  username: '',
  name: '',
  surname: '',
  password: '',
  value: '',
  isRegistering: false,
  isForgot: false,
  registerOutput: [],
  userId: null,
  usernameError: '',
  nameError: '',
  surnameError: '',
  passwordError: '',
  loginUsername: '',
  loginPassword: '',
  forgotUsername: '',
  picture: '',
}: LoginStateType));

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: LoginStateType): LoginStateType =>
  Object.assign({}, state, { fetching: true });

// we've successfully logged in
const success = (state: LoginStateType, { user }: Object): LoginStateType =>
  Object.assign({}, state, { fetching: false, error: '', user });

const userReset = (state: LoginStateType): LoginStateType =>
  Object.assign({}, state, { user: null, userId: null });

// we've had a problem logging in
const failure = (state: LoginStateType, { error }: Object): LoginStateType =>
  Object.assign({}, state, {
    fetching: false,
    error,
    loginPassword: '',
  });

// we've logged out
const logout = (): LoginStateType => INITIAL_STATE;

const nameChange = (state: LoginStateType, { name }: Object): LoginStateType =>
  Object.assign({}, state, { name });

const surnameChange = (
  state: LoginStateType,
  { surname }: Object,
): LoginStateType => Object.assign({}, state, { surname });

const usernameChange = (
  state: LoginStateType,
  { username }: Object,
): LoginStateType => Object.assign({}, state, { username });

const passwordChange = (
  state: LoginStateType,
  { password }: Object,
): LoginStateType => Object.assign({}, state, { password });

const loginUsernameChange = (
  state: LoginStateType,
  { loginUsername }: Object,
): LoginStateType => Object.assign({}, state, { loginUsername });

const loginPasswordChange = (
  state: LoginStateType,
  { loginPassword }: Object,
): LoginStateType => Object.assign({}, state, { loginPassword });

const facebookLoginSuccess = (
  state: LoginStateType,
  { value }: Object,
): LoginStateType => Object.assign({}, state, { value });

const pictureChange = (
  state: LoginStateType,
  { picture }: Object,
): LoginStateType => Object.assign({}, state, { picture });

const registerBegin = (state: LoginStateType): LoginStateType =>
  Object.assign({}, state, { isRegistering: true });
const registerComplated = (state: LoginStateType): LoginStateType =>
  Object.assign({}, state, INITIAL_STATE);

const forgotPasswordBegin = (state: LoginStateType): LoginStateType =>
  Object.assign({}, state, { isForgot: true });
const forgotPasswordComplated = (state: LoginStateType): LoginStateType =>
  Object.assign({}, state, INITIAL_STATE);

const registerOutputChange = (
  state: LoginStateType,
  { registerOutput }: Object,
): LoginStateType => Object.assign({}, state, { registerOutput });

const userIdChange = (
  state: LoginStateType,
  { userId }: Object,
): LoginStateType => Object.assign({}, state, { userId });

const forgotUsernameChange = (
  state: LoginStateType,
  { forgotUsername }: Object,
): LoginStateType => Object.assign({}, state, { forgotUsername });

const usernameErrorChange = (
  state: LoginStateType,
  { usernameError }: Object,
): LoginStateType => Object.assign({}, state, { usernameError });

const nameErrorChange = (
  state: LoginStateType,
  { nameError }: Object,
): LoginStateType => Object.assign({}, state, { nameError });

const surnameErrorChange = (
  state: LoginStateType,
  { surnameError }: Object,
): LoginStateType => Object.assign({}, state, { surnameError });

const passwordErrorChange = (
  state: LoginStateType,
  { passwordError }: Object,
): LoginStateType => Object.assign({}, state, { passwordError });
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout,
  [Types.USERNAME_CHANGE]: usernameChange,
  [Types.NAME_CHANGE]: nameChange,
  [Types.SURNAME_CHANGE]: surnameChange,
  [Types.PASSWORD_CHANGE]: passwordChange,
  [Types.FACEBOOK_LOGIN_SUCCESS]: facebookLoginSuccess,
  [Types.REGISTER_BEGIN]: registerBegin,
  [Types.REGISTER_COMPLATED]: registerComplated,
  [Types.FORGOT_PASSWORD_BEGIN]: forgotPasswordBegin,
  [Types.FORGOT_PASSWORD_COMPLATED]: forgotPasswordComplated,
  [Types.REGISTER_OUTPUT_CHANGE]: registerOutputChange,
  [Types.USER_ID_CHANGE]: userIdChange,
  [Types.USERNAME_ERROR_CHANGE]: usernameErrorChange,
  [Types.NAME_ERROR_CHANGE]: nameErrorChange,
  [Types.SURNAME_ERROR_CHANGE]: surnameErrorChange,
  [Types.PASSWORD_ERROR_CHANGE]: passwordErrorChange,
  [Types.LOGIN_USERNAME_CHANGE]: loginUsernameChange,
  [Types.LOGIN_PASSWORD_CHANGE]: loginPasswordChange,
  [Types.FORGOT_USERNAME_CHANGE]: forgotUsernameChange,
  [Types.USER_RESET]: userReset,
  [Types.PICTURE_CHANGE]: pictureChange,
  // [Types.REGISTER_REQUEST]: registerRequest,
});

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: LoginStateType): boolean =>
  loginState.user !== null;
