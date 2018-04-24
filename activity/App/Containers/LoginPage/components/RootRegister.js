// @flow

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';
import SignupSection from './SignupSection';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';

const RegisterStack = StackNavigator({
  LoginPage: { screen: LoginPage },
  RegisterPage: { screen: RegisterPage },
});

export default class RootRegister extends Component<*> {
  render(): React$Element< * > {
    return <RegisterStack />;
  }
}
