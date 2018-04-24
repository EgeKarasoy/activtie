// @flow

import { put, call, select } from 'redux-saga/effects';
import type User from 'firebase';
import LoginActions from '../Redux/LoginRedux';
import type StateType from '../Redux/LoginRedux';
import { reduxSagaFirebase } from '../../App';

const usernameFunc = (state: StateType): ?string => state.login.username;
const passwordFunc = (state: StateType): ?string => state.login.password;

// attempts to login
const loginFunc = function* login(): Iterable< any > {
  const username = yield select(usernameFunc);
  const password = yield select(passwordFunc);

  try {
    const user: User = yield call(
      reduxSagaFirebase.auth.signInWithEmailAndPassword,
      username,
      password,
    );
    yield put(LoginActions.loginSuccess(user));
  } catch (error) {
    yield put(LoginActions.loginFailure(error));
  }
};

export default loginFunc;
