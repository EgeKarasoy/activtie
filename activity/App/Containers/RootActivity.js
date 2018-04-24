// @flow

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Dimensions } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActivityMain from './ActivityMain';
import ProfileScreen from './Profile/index';
import ActivityCreate from './ActivityCreate';
import ActivitySearch from './ActivitySearch';

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px: number): void {
  const val1: any = px * deviceW;
  const val2: any = val1 / basePx;
  return val2;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

type RootActivityStateType = {
  selectedTab: ?string
};

export default class RootActivity extends Component<
  null,
  RootActivityStateType,
> {
  state = {
    selectedTab: 'ActivityMain',
  };

  render(): React$Element< * > {
    return (
      <TabNavigator style={styles.container}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'ActivityMain'}
          title="Keşfet"
          selectedTitleStyle={{ color: '#3496f0' }}
          renderIcon={(): any => (
            <Icon name="home" size={px2dp(22)} color="#666" />
          )}
          renderSelectedIcon={(): any => (
            <Icon name="home" size={px2dp(22)} color="#3496f0" />
          )}
          // badgeText="1"
          onPress={(): void => this.setState({ selectedTab: 'ActivityMain' })}
        >
          <ActivityMain />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'ActivitySearch'}
          title="Ara"
          selectedTitleStyle={{ color: '#3496f0' }}
          renderIcon={(): any => (
            <Icon name="search" size={px2dp(22)} color="#666" />
          )}
          renderSelectedIcon={(): any => (
            <Icon name="search" size={px2dp(22)} color="#3496f0" />
          )}
          // badgeText="1"
          onPress={(): void => this.setState({ selectedTab: 'ActivitySearch' })}
        >
          <ActivitySearch />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'ActivityCreate'}
          title="Yarat"
          selectedTitleStyle={{ color: '#3496f0' }}
          renderIcon={(): any => (
            <Ionicons name="ios-create" size={px2dp(22)} color="#666" />
          )}
          renderSelectedIcon={(): any => (
            <Ionicons name="ios-create" size={px2dp(22)} color="#3496f0" />
          )}
          // badgeText="1"
          onPress={(): void => this.setState({ selectedTab: 'ActivityCreate' })}
        >
          <ActivityCreate />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'ProfileScreen'}
          title="Profil"
          selectedTitleStyle={{ color: '#3496f0' }}
          renderIcon={(): any => (
            <Icon name="user" size={px2dp(22)} color="#666" />
          )}
          renderSelectedIcon={(): any => (
            <Icon name="user" size={px2dp(22)} color="#3496f0" />
          )}
          onPress={(): void => this.setState({ selectedTab: 'ProfileScreen' })}
        >
          <ProfileScreen />
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

AppRegistry.registerComponent('RootActivity', (): any => RootActivity);
