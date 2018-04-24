// @flow

import React, { Component } from 'react';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Image,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import type { StateType } from '../../../Redux/index';
import LoginActions from '../../../Redux/LoginRedux';
import spinner from '../images/loading.gif';
// import RootContainer from '../../RootContainer';
import LoginPage from './LoginPage';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
});

type ForgotButtonSubmitPropType = {
  // user: ?string,
  // username: ?string,
  // password: ?string,
  buttonPress: Function,
  // facebookData: ?string
  forgotPasswordComplated: Function
};

type ForgotButtonSubmitStateType = {
  isLoading: boolean,
  username: ?string,
  isForgot: boolean
  // backButton: boolean
  // json: any
};

export class ForgotButtonSubmit extends Component<
  ForgotButtonSubmitPropType,
  ForgotButtonSubmitStateType,
> {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      username: '',
      isForgot: false,
    };

    //    this.buttonAnimated = new Animated.Value(0);
    //    this.growAnimated = new Animated.Value(0);
    // this._onPress = this._onPress.bind(this);
  }

  render(): ?React$Element< * > {
    // const changeWidth = this.buttonAnimated.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    // });
    // const changeScale = this.growAnimated.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [1, MARGIN],
    // });
    if (this.state.isForgot) return <LoginPage />;

    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            width: 150,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={this.props.buttonPress}
            activeOpacity={1}
          >
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>SEND PASSWORD</Text>
            )}
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.button}
            onPress={this.onRegister}
            activeOpacity={1}
          >
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>Go Back</Text>
            )}
          </TouchableOpacity> */}
          {/* <Animated.View style={{ width: 5 }} /> */}
        </Animated.View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  buttonPress: (): void => dispatch(LoginActions.loginRequest()),
  forgotComplated: () => {
    dispatch(LoginActions.forgotComplated());
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  username: state.login.username,
  error: state.login.error,
  isForgot: state.login.isForgot,
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotButtonSubmit);
