// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  Dimensions,
  // TouchableOpacity,
  // Image,
} from 'react-native';
import LoginActionCreators from '../../../Redux/LoginRedux';
import type { StateType } from '../../../Redux/index';

import UserInput from './UserInput';

import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
// import eyeImg from '../images/eye_black.png';

type ForgotScreenPropType = {
  forgotUsername: ?string,
  forgotUsernameChange: Function,
  error: ?string
  // name: ?string,
  // nameChange: Function
};

// type LoginFormStateType = {
//   showPass: boolean,
//   press: boolean
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  btnEye: {
    position: 'absolute',
    top: 55,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
});

export class ForgotScreen extends Component<ForgotScreenPropType> {
  // constructor(props: LoginFormPropType) {
  //   super(props);
  //   this.state = {
  //     showPass: true,
  //     press: false,
  //   };
  //   this.showPass = this.showPass.bind(this);
  // }

  // showPass() {
  //   this.state.press === false
  //     ? this.setState({ showPass: false, press: true })
  //     : this.setState({ showPass: true, press: false });
  // }

  render(): ?React$Element< * > {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        {/* <UserInput
          source={usernameImg}
          secureTextEntry={false}
          placeholder=" Username"
          autoCapitalize="none"
          returnKeyType="done"
          autoCorrect={false}
          onChangeText={this.props.nameChange}
          value={this.props.name}
        /> */}
        <UserInput
          source={usernameImg}
          secureTextEntry={false}
          placeholder=" Email"
          autoCapitalize="none"
          returnKeyType="done"
          autoCorrect={false}
          onChangeText={this.props.forgotUsernameChange}
          value={this.props.forgotUsername}
        />
        {/* <UserInput
          source={passwordImg}
          secureTextEntry
          placeholder=" Repeat Password"
          returnKeyType="done"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={this.props.passwordChange}
          value={this.props.password}
        /> */}
        {/* <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnEye}
          onPress={this.showPass}
        >
          <Image source={eyeImg} style={styles.iconEye} />
        </TouchableOpacity> */}
        <Text style={{ backgroundColor: 'red' }}>{this.props.error}</Text>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  // nameChange: (name: ?string) => {
  //   console.log(name);
  //   dispatch(LoginActionCreators.nameChange(name));
  // },
  forgotUsernameChange: (text: ?string) => {
    console.log(text);
    dispatch(LoginActionCreators.forgotUsernameChange(text));
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  forgotUsername: state.login.forgotUsername,
  // name: state.login.name,
  error: state.login.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotScreen);
