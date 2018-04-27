// @flow

import React, { Component } from 'react';
import ValidationComponent from 'react-native-form-validator';
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
import { Button } from 'native-base';
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

type RegisterButtonSubmitPropType = {
  isLoading: boolean,
  username: ?string,
  name: ?string,
  surname: ?string,
  password: ?string,
  isRegistering: boolean,
  registerPost: Function,
  usernameError: ?string,
  usernameErrorChange: Function,
  nameError: ?string,
  nameErrorChange: Function,
  surnameError: ?string,
  surnameErrorChange: Function,
  passwordError: ?string,
  passwordErrorChange: Function,
  // user: ?string,
  // username: ?string,
  // password: ?string,
  buttonPress: Function,
  // facebookData: ?string
  registerComplated: Function
};

// type RegisterButtonSubmitStateType = {
//   isLoading: boolean,
//   username: ?string,
//   name: ?string,
//   surname: ?string,
//   password: ?string,
//   isRegistering: boolean
//   // backButton: boolean
//   // json: any
// };

export class RegisterButtonSubmit extends Component<
  RegisterButtonSubmitPropType,
> {
  // constructor() {
  //   super();

  //   this.state = {
  //     isLoading: false,
  //   };

  //   //    this.buttonAnimated = new Animated.Value(0);
  //   //    this.growAnimated = new Animated.Value(0);
  //   // this._onPress = this._onPress.bind(this);
  // }
  // onRegister = () => {
  //   const { username, password } = this.state;
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(username, password)
  //     .then(() => {
  //       const registerDone = this.props.registerComplated;
  //       registerDone();
  //       // If you need to do anything with the user, do it here
  //       // The user will be logged in automatically by the
  //       // `onAuthStateChanged` listener we set up in App.js earlier
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //       // For details of error codes, see the docs
  //       // The message contains the default Firebase string
  //       // representation of the error
  //     });
  // };
  onPressButton= () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.props.name.length < 3) {
      const nameError = this.props.nameErrorChange;
      nameError('Adinizi Tam Girin..');
    }
    else if (this.props.surname.length < 3) {
      const nameError = this.props.nameErrorChange;
      nameError('');
      const surnameError = this.props.surnameErrorChange;
      surnameError('Soyadinizi Tam Girin..');
    }
    else if (reg.test(this.props.username) === false) {
      const surnameError = this.props.surnameErrorChange;
      surnameError('');
      const usernameError = this.props.usernameErrorChange;
      usernameError('Gecerli bir email girin..');
    }
    else if (this.props.password.length < 6) {
      const usernameError = this.props.usernameErrorChange;
      usernameError('');
      const passwordError = this.props.passwordErrorChange;
      passwordError('Gecerli bir sifre girin, Minimum 5 Karakter');
    } 
    else {
      const passwordError = this.props.passwordErrorChange;
      passwordError('');
      this.buttonPress();
    }
  };

  buttonPress= () => {
    fetch('http://activtie.com/api/registration', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: this.props.name,
        user_surname: this.props.surname,
        user_e_mail: this.props.username,
        user_password: this.props.password,
      }),
    })
      .then((response: any): any => {
        console.log(response);
        return response.json();
      })
      .then((responseJson: any) => {
        const registerSend = this.props.registerPost;
        registerSend(responseJson);
        const registerDone = this.props.registerComplated;
        registerDone();

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
    // if (this.state.isRegistering) return <LoginPage />;

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
            <Text style={styles.text}>SIGN UP</Text>
          </TouchableOpacity>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>{this.props.nameError}{this.props.surnameError}{this.props.usernameError}{this.props.passwordError}</Text>
          {/* <Text style={{ color: 'red', fontWeight: 'bold' }}>{this.props.usernameError}</Text> */}
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
  nameErrorChange: (value: Object) => {
    dispatch(LoginActions.nameErrorChange(value));
  },
  usernameErrorChange: (value: Object) => {
    dispatch(LoginActions.usernameErrorChange(value));
  },
  surnameErrorChange: (value: Object) => {
    dispatch(LoginActions.surnameErrorChange(value));
  },
  passwordErrorChange: (value: Object) => {
    dispatch(LoginActions.passwordErrorChange(value));
  },
  registerPost: (value: Object) => {
    dispatch(LoginActions.registerOutputChange(value));
  },
  registerComplated: () => {
    dispatch(LoginActions.registerComplated());
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  username: state.login.username,
  password: state.login.password,
  name: state.login.name,
  surname: state.login.surname,
  registerOutput: state.login.registerOutput,
  error: state.login.error,
  isRegistering: state.login.isRegistering,
  usernameError: state.login.usernameError,
  nameError: state.login.nameError,
  surnameError: state.login.surnameError,
  passwordError: state.login.passwordError,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterButtonSubmit);
