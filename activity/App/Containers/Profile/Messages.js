// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  CardItem,
} from 'native-base';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import type { StateType } from '../../Redux/index';
import ProfileActionCreators from '../../Redux/ProfileRedux';

type MessagesType = {
  userId: ?string,
  getProfileMessagesDataButton: Function,
  profileMessagesData: Array< mixed >
};

class Messages extends Component<MessagesType> {
  componentDidMount() {
    const goMessages = this.getProfileMessagesData;
    goMessages();
    // console.disableYellowBox = true;
  }

  getProfileMessagesData = (): void =>
    fetch(
      `http://activtie.com/api/inbox/{"user_id":${
        this.props.userId
      },"message_type":"message"}`,
      { method: 'GET' },
    )
      .then((response: any): any => response.json())
      .then((responseJson: any) => {
        const messageSend = this.props.getProfileMessagesDataButton;
        messageSend(responseJson);
        // dispatch(ActivityActionCreators.getLatestActivityData(responseJson));
      })
      .catch((error: any) => {
        console.error(error);
      });
  render(): React$Element< * > {
    return (
      <CardItem>
        <FlatList
          data={this.props.profileMessagesData}
          keyExtractor={(x: any, i: any): any => i}
          renderItem={({ item }: any): React$Element< * > => (
            <Container>
              <Content>
                <List>
                  <ListItem avatar>
                    <Left>
                      <Thumbnail
                        source={{
                          uri:
                            'https://image.ibb.co/gEHBj7/Screen_Shot_2018_04_13_at_16_01_35.jpg',
                        }}
                      />
                    </Left>
                    <Body>
                      <Text>
                        {` ${item.sender_name}`}
                        {` ${item.sender_surname}`}
                      </Text>
                      <Text note>{` ${item.message_info}`}</Text>
                    </Body>
                    <Right>
                      <Text note>{` ${item.message_time}`}</Text>
                    </Right>
                  </ListItem>
                </List>
              </Content>
            </Container>
          )}
        />
      </CardItem>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  getProfileMessagesDataButton: (value: Object) => {
    dispatch(ProfileActionCreators.getProfileMessagesData(value));
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  profileMessagesData: state.profile.profileMessagesData,
  userId: state.login.userId,
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
