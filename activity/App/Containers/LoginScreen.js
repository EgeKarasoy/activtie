// @flow

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import * as firebase from 'firebase';
import type { User } from 'firebase';
// import Expo from 'expo';

import LoginActionCreators from '../Redux/LoginRedux';
import type { StateType } from '../Redux/index';
import RootContainer from './RootContainer';
import LoginPage from './LoginPage/components/Main';
import RegisterPage from './LoginPage/components/RegisterPage';
import ForgotPage from './LoginPage/components/ForgotPage';
import RootActivity from './RootActivity';

type LoginScreenPropType = {
  user: ?string,
  loading: ?boolean,
  addLoginListener: Function
};

type LoginScreenStateType = {
  email: string,
  password: string
};

class LoginScreen extends Component<LoginScreenPropType, LoginScreenStateType> {
  // componentDidMount() {
  //   // if redux persist is not active fire startup action
  //   // if (!ReduxPersist.active) {
  //   // this.props.addLoginListener();
  //   // }
  // }

  // onLogin = () => {
  //   const { email, password } = this.state;
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then((user: User) => {
  //       // If you need to do anything with the user, do it here
  //       // The user will be logged in automatically by the
  //       // `onAuthStateChanged` listener we set up in App.js earlier
  //     })
  //     .catch((error: Object) => {
  //       const { code, message } = error;
  //       // For details of error codes, see the docs
  //       // The message contains the default Firebase string
  //       // representation of the error
  //     });
  // };

  // onRegister = () => {
  //   const { email, password } = this.state;
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((user) => {
  //       // If you need to do anything with the user, do it here
  //       // The user will be logged in automatically by the
  //       // `onAuthStateChanged` listener we set up in App.js earlier
  //     })
  //     .catch((error) => {
  //       const { code, message } = error;
  //       // For details of error codes, see the docs
  //       // The message contains the default Firebase string
  //       // representation of the error
  //     });
  // };

  // loginWithFacebook = async (): Promise< void > => {
  //   const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
  //     '559657841057861',
  //     {
  //       permissions: ['public_profile'],
  //     },
  //   );
  //   if (type === 'success') {
  //     // Get the user's name using Facebook's Graph API
  //     const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
  //     alert('Logged in!', `Hi ${(await response.json()).name}!`);
  //   }
  // };

  render(): ?React$Element< * > {
    // The application is initialising
    if (this.props.loading) return null;
    // The user is an Object, so they're logged in
    if (this.props.user) return <RootActivity />;
    if (this.props.isRegistering) return <RegisterPage />;
    if (this.props.isForgot) return <ForgotPage />;
    // The user is null, so they're logged out
    return <RootActivity />;
    // register={this.props.isRegistred}
  }
}

// RootContainer.propTypes = {
//   startup: PropTypes.func,
//   buttonPress: PropTypes.func,
// };

// RootContainer.defaultProps = {
//   startup: null,
//   buttonPress: null,
// };

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  addLoginListener: () => {
    firebase.auth().onAuthStateChanged((user: Object) => {
      dispatch(LoginActionCreators.loginSuccess(user));
    });
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  loading: state.login.fetching,
  user: state.login.user,
  isRegistering: state.login.isRegistering,
  isForgot: state.login.isForgot,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
