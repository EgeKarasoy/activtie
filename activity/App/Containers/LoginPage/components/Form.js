// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  // TouchableOpacity,
  // Image,
} from 'react-native';
import LoginActionCreators from '../../../Redux/LoginRedux';
import type { StateType } from '../../../Redux/index';

import UserInput from './UserInput';

import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
// import eyeImg from '../images/eye_black.png';

type LoginFormPropType = {
  loginUsername: ?string,
  loginUsernameChange: Function,
  loginPassword: ?string,
  loginPasswordChange: Function,
  error: ?string
};

// type LoginFormStateType = {
//   showPass: boolean,
//   press: boolean
// };

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
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

export class Form extends Component<LoginFormPropType> {
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
        <UserInput
          source={usernameImg}
          secureTextEntry={false}
          placeholder=" Email"
          autoCapitalize="none"
          returnKeyType="done"
          autoCorrect={false}
          onChangeText={this.props.loginUsernameChange}
          value={this.props.loginUsername}
        />
        <UserInput
          source={passwordImg}
          secureTextEntry
          placeholder=" Password"
          returnKeyType="done"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={this.props.loginPasswordChange}
          value={this.props.loginPassword}
        />
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

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  loginUsernameChange: (text: ?string) => {
    console.log(text);
    dispatch(LoginActionCreators.loginUsernameChange(text));
  },
  loginPasswordChange: (text: ?string) => {
    console.log(text);
    dispatch(LoginActionCreators.loginPasswordChange(text));
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  loginUsername: state.login.loginUsername,
  loginPassword: state.login.loginPassword,
  error: state.login.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
