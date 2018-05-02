// @flow

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
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
  Card,
} from 'native-base';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import type { StateType } from '../../Redux/index';
import ProfileActionCreators from '../../Redux/ProfileRedux';

type MessagesType = {
  userId: ?string,
  getProfileMessagesDataButton: Function,
  profileMessagesData: Array< mixed >,
  messagesAvaibleCheck: Function,
  messagesAvaibleCheckCompleted: Function
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
        const notificationSuccess = this.props.messagesAvaibleCheckCompleted;
        notificationSuccess();
        // dispatch(ActivityActionCreators.getLatestActivityData(responseJson));
      })
      .catch(() => {
        const messagesFailed = this.props.messagesAvaibleCheck;
        messagesFailed();
      });
  render(): React$Element< * > {
    if (this.props.isMessagesAvaible) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold', color: 'black' }}>
            Mesajiniz Bulunmuyor..
          </Text>
        </View>
      );
    }
    return (
      <CardItem>
        <FlatList
          data={this.props.profileMessagesData}
          keyExtractor={(x: any, i: any): any => i}
          renderItem={({ item }: any): React$Element< * > => (
            <List>
              <ListItem avatar>
                <Left>
                  <Thumbnail
                    source={{ uri: `http://activtie.com/${item.user_picture}` }}
                  />
                </Left>
                <Body>
                  <Text>
                    {` ${item.sender_name}`} {`${item.sender_surname}`}
                  </Text>
                  <Text note>{` ${item.message_info}`}</Text>
                  <Text note>✓{` ${item.message_time}`}</Text>
                </Body>
                {/* <Right>
                  <Text note>{` ${item.message_time}`}</Text>
                </Right> */}
              </ListItem>
            </List>
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
  messagesAvaibleCheckCompleted: () => {
    dispatch(ProfileActionCreators.messagesAvaibleCheckCompleted());
  },
  messagesAvaibleCheck: () => {
    dispatch(ProfileActionCreators.messagesAvaibleCheck());
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  profileMessagesData: state.profile.profileMessagesData,
  userId: state.login.userId,
  isMessagesAvaible: state.profile.isMessagesAvaible,
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
