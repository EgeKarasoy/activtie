// @flow

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { TabNavigator } from 'react-navigation';
// import { FontAwesome } from '@expo/vector-icons';
import { Icon } from 'native-base';
// import GateMonitorsScreen from './GateMonitorsScreen';
import ProfileScreen from './ProfileScreen';
import ActivityMain from './ActivityMain';

const RootStack = TabNavigator({
  GateMonitors: {
    screen: ActivityMain,
    navigationOptions: {
      tabBarlabel: 'Gate',
      tabBaricon: <Icon active name="feed" />,
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarlabel: 'Profile',
      tabBaricon: <Icon name="person" />,
    },
  },
});

export default class RootContainer extends Component<*> {
  componentDidMount() {}

  render(): React$Element< * > {
    //    const goBack = (): void => this.props.navigation.goBack();
    //    const gotoDetails = (): void => this.props.navigation.navigate('Details');

    return <RootStack />;
  }
}
