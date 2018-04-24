// @flow

import React, { Component } from 'react';
import RegisterLogo from './RegisterLogo';
import RegisterScreen from './RegisterScreen';
import Wallpaper from './Wallpaper';
import RegisterButtonSubmit from './RegisterButtonSubmit';

export default class RegisterPage extends Component<*> {
  render(): React$Element< * > {
    return (
      <Wallpaper>
        <RegisterLogo />
        <RegisterScreen />
        <RegisterButtonSubmit />
      </Wallpaper>
    );
  }
}
