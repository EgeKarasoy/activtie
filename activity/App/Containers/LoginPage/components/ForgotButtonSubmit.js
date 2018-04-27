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
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
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
  forgotPasswordComplated: Function,
  forgotUsername: ?string,
  usernameErrorChange: Function,
  usernameError: ?string
};

type ForgotButtonSubmitStateType = {
  isLoading: boolean
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
    };

    //    this.buttonAnimated = new Animated.Value(0);
    //    this.growAnimated = new Animated.Value(0);
    // this._onPress = this._onPress.bind(this);
  }

  onPressButton = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.props.forgotUsername) === false) {
      const usernameError2 = this.props.usernameErrorChange;
      usernameError2('Gecerli bir email girin..');
    } else {
      const passwordError2 = this.props.usernameErrorChange;
      passwordError2('');
      this.buttonPress();
    }
  };

  buttonPress = () => {
    fetch('http://activtie.com/api/new_password', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_e_mail: this.props.forgotUsername,
      }),
    })
      .then((response: any): any => {
        console.log(response);
        return response.json();
      })
      .then(() => {
        Alert.alert(
          'İşlem Başarılı !',
          'Şifreniz Mail Adresinize Gönderilmiştir',
          [
            { text: 'Tamam', onPress: (): void => console.log('Tamama Basıldı') },
          ],
          { cancelable: false },
        )
        const forgotDone = this.props.forgotPasswordComplated;
        forgotDone();

        // dispatch(LoginActions.registerComplated());
      })
      .catch((error: any) => {
        console.error(error);
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
            onPress={this.onPressButton}
            activeOpacity={1}
          >
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>SIFRE GONDER</Text>
            )}
          </TouchableOpacity>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>{this.props.usernameError}</Text>
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
  usernameErrorChange: (value: Object) => {
    dispatch(LoginActions.usernameErrorChange(value));
  },
  buttonPress: (): void => dispatch(LoginActions.loginRequest()),
  forgotPasswordComplated: () => {
    dispatch(LoginActions.forgotPasswordComplated());
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  forgotUsername: state.login.forgotUsername,
  usernameError: state.login.usernameError,
  error: state.login.error,
  isForgot: state.login.isForgot,
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotButtonSubmit);
