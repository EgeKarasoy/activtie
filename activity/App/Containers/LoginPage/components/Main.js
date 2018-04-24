// @flow
import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';

import LoginPage from './LoginPage';
import SecondScreen from './SecondScreen';

export class Main extends Component<*> {
  render(): React$Element< * > {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="loginScreen"
            component={LoginPage}
            animation="fade"
            hideNavBar
            initial
          />
          <Scene
            key="secondScreen"
            component={SecondScreen}
            animation="fade"
            hideNavBar
          />
        </Scene>
      </Router>
    );
  }
}

export default connect(null, null)(LoginPage);
