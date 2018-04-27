// @flow

import React, { Component } from 'react';
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Thumbnail,
  Button,
  Icon,
  Header,
  Item,
} from 'native-base';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import type { StateType } from '../../../Redux/LoginRedux';
import LoginActionCreators from '../../../Redux/LoginRedux';
import RegisterLogo from './RegisterLogo';
import RegisterScreen from './RegisterScreen';
import Wallpaper from './Wallpaper';
import RegisterButtonSubmit from './RegisterButtonSubmit';

type RegisterPagePropType = {
  registerComplatedButton: Function
};

class RegisterPage extends Component<RegisterPagePropType> {
  render(): React$Element< * > {
    return (
      <Wallpaper>
        <Header>
          <Left>
            <Button transparent onPress={this.props.registerComplatedButton}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
        </Header>
        <RegisterLogo />
        <RegisterScreen />
        <RegisterButtonSubmit />
      </Wallpaper>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  registerComplatedButton: () => {
    dispatch(LoginActionCreators.registerComplated());
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  isRegistering: state.login.isRegistering,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
