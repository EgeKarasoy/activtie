// @flow

import React, { Component } from 'react';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
// import RootRegister from './RootRegister';

export default class LoginPage extends Component<*> {
  render(): React$Element< * > {
    return (
      <Wallpaper>
        <Logo />
        <Form />
        <SignupSection />
        {/* <RootRegister /> */}
        <ButtonSubmit />
      </Wallpaper>
    );
  }
}
