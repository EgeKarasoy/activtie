// @flow

import React, { Component } from 'react';
import ForgotLogo from './ForgotLogo';
import ForgotScreen from './ForgotScreen';
import Wallpaper from './Wallpaper';
import ForgotButtonSubmit from './ForgotButtonSubmit';

export default class ForgotPage extends Component<*> {
  render(): React$Element< * > {
    return (
      <Wallpaper>
        <ForgotLogo />
        <ForgotScreen />
        <ForgotButtonSubmit />
      </Wallpaper>
    );
  }
}
