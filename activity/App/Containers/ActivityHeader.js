// @flow

import React, { Component } from 'react';
import { Image } from 'react-native';
import { Header, Body } from 'native-base';

export default class ActivityHeader extends Component<*> {
  render(): React$Element< * > {
    return (
      <Header>
        <Body>
          <Image
            source={require('./LoginPage/images/activtie.jpeg')}
            style={{ width: 190, height: 30 }}
          />
        </Body>
      </Header>
    );
  }
}
