// @flow

import React, { Component } from 'react';
import { Left, Button, Icon, Header } from 'native-base';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import type { StateType } from '../../../Redux/LoginRedux';
import LoginActionCreators from '../../../Redux/LoginRedux';
import ForgotLogo from './ForgotLogo';
import ForgotScreen from './ForgotScreen';
import Wallpaper from './Wallpaper';
import ForgotButtonSubmit from './ForgotButtonSubmit';

type ForgotpagePropType = {
  forgotPasswordComplatedButton: Function
};

class ForgotPage extends Component<ForgotpagePropType> {
  render(): React$Element< * > {
    return (
      <Wallpaper>
        <Header>
          <Left>
            <Button
              transparent
              onPress={this.props.forgotPasswordComplatedButton}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
        </Header>
        <ForgotLogo />
        <ForgotScreen />
        <ForgotButtonSubmit />
      </Wallpaper>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  forgotPasswordComplatedButton: () => {
    dispatch(LoginActionCreators.forgotPasswordComplated());
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  isForgot: state.login.isForgot,
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPage);
