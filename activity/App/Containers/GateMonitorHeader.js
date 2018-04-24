// @flow

import React, { Component } from 'react';
import { Text } from 'react-native';
import { Header, Body } from 'native-base';

type AppHeaderPropsType = {
  text: ?string
};

export default class AppHeader extends Component<AppHeaderPropsType> {
  render(): React$Element< * > {
    return (
      <Header style={{ backgroundColor: 'green' }}>
        <Body>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
            {this.props.text}
          </Text>
        </Body>
      </Header>
    );
  }
}
