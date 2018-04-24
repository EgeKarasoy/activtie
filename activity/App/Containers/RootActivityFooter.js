// @flow

import React, { Component } from 'react';
import { Text } from 'react-native';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

type RootActivityStateType = {
  activeTabName: ?string
};

export default class RootActivityFooter extends Component<
  null,
  RootActivityStateType,
> {
  constructor() {
    super();
    this.state = {
      activeTabName: 'feed',
    };
  }

  tabAction(tab: ?string) {
    this.setState({ activeTabName: tab });
    if (tab === 'feed') {
      Actions.feed();
    } else if (tab === 'news') {
      Actions.news();
    } else {
      Actions.about();
    }
  }

  render(): React$Element< * > {
    return (
      <Footer>
        <FooterTab>
          <Button
            active={this.state.activeTabName === 'feed' ? true : ''}
            onPress={() => {
              this.tabAction('feed');
            }}
          >
            <Icon name="egg" />
            <Text>Feed</Text>
          </Button>
          <Button
            active={this.state.activeTabName === 'news' ? true : ''}
            onPress={() => {
              this.tabAction('news');
            }}
          >
            <Icon active name="paper" />
            <Text>News</Text>
          </Button>
          <Button
            active={this.state.activeTabName === 'about' ? true : ''}
            onPress={() => {
              this.tabAction('about');
            }}
          >
            <Icon name="person" />
            <Text>Profile</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
