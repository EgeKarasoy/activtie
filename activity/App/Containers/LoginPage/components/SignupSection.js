// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import LoginActionCreators from '../../../Redux/LoginRedux';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

// const App = StackNavigator({
//   RegisterPage: { screen: RegisterPage },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 175,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: 'white',
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
});

type SignupSectionPropType = {
  registerBegin: Function,
  forgotPasswordBegin: Function
};

// type SignupSectionStateType = {
//   isRegistering: ?boolean
// };

class SignupSection extends Component<SignupSectionPropType> {
  // registerPage() {<RegisterPage />;
  // static navigationOptions = {
  //   title: 'SignupSection',
  // };

  render(): React$Element< * > {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.registerBegin}>
          <Text style={styles.text}>Kayıt Ol</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.forgotPasswordBegin}>
          <Text style={styles.text}>Şifremi Unuttum</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  registerBegin: () => {
    dispatch(LoginActionCreators.registerBegin());
  },
  forgotPasswordBegin: () => {
    dispatch(LoginActionCreators.forgotPasswordBegin());
  },
});

export default connect(null, mapDispatchToProps)(SignupSection);
