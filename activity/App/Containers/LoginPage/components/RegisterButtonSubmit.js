// @flow

import React, { Component } from 'react';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Image,
  View,
  Dimensions,
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

type RegisterButtonSubmitPropType = {
  // user: ?string,
  // username: ?string,
  // password: ?string,
  buttonPress: Function,
  // facebookData: ?string
  registerComplated: Function
};

type ButtonSubmitStateType = {
  isLoading: boolean,
  username: ?string,
  password: ?string,
  isRegistering: boolean
  // backButton: boolean
  // json: any
};

export class RegisterButtonSubmit extends Component<
  RegisterButtonSubmitPropType,
  ButtonSubmitStateType,
> {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      username: '',
      password: '',
      isRegistering: false,
    };

    //    this.buttonAnimated = new Animated.Value(0);
    //    this.growAnimated = new Animated.Value(0);
    // this._onPress = this._onPress.bind(this);
  }
  onRegister = () => {
    const { username, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .then(() => {
        const registerDone = this.props.registerComplated;
        registerDone();
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch((error: any) => {
        console.log(error);
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  };

  render(): ?React$Element< * > {
    // const changeWidth = this.buttonAnimated.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    // });
    // const changeScale = this.growAnimated.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [1, MARGIN],
    // });
    if (this.state.isRegistering) return <LoginPage />;

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
              <Text style={styles.text}>SIGN UP</Text>
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
  registerComplated: () => {
    firebase.auth().onAuthStateChanged(() => {
      dispatch(LoginActions.registerComplated());
    });
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  username: state.login.username,
  password: state.login.password,
  error: state.login.error,
  isRegistering: state.login.isRegistering,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterButtonSubmit);
