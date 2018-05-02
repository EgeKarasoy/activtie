// @flow

import React, { Component } from 'react';
import { FlatList, View, Alert } from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Body,
  Button,
  Icon,
  CardItem,
} from 'native-base';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import type { StateType } from '../../Redux/index';
import ProfileActionCreators from '../../Redux/ProfileRedux';

type NotificationsType = {
  userId: ?string,
  activityId: ?string,
  notificationsMessageId: ?string,
  getProfileNotificationsDataButton: Function,
  profileNotificationsData: Array< mixed >,
  notificationsAvaibleCheckCompleted: Function,
  notificationsAvaibleCheck: Function,
  notificationsRequestKeeper: Function,
  notificationsMessageType: ?string,
  notificationsMessageTypeAccept: Function,
  notificationsMessageTypeDecline: Function,
  notificationsMessageTypeNull: Function,
  notificationsRequest: boolean,
  getProfileNotificationsMessageId: Function
};

class Notifications extends Component<NotificationsType> {
  componentDidMount() {
    const goMessages = this.getProfileNotificationsData;
    goMessages();
    // console.disableYellowBox = true;
  }
  onPressAcceptButton = () => {
    const acceptNotification = this.props.notificationsMessageTypeAccept;
    acceptNotification('accept');
    console.log(this.props.notificationsMessageTypeAccept);
    const goPostStatusFromAccept = this.postNotificationStatusAccept;
    goPostStatusFromAccept();
  };

  onPressDeclineButton = () => {
    const declineNotification = this.props.notificationsMessageTypeDecline;
    declineNotification('decline');
    const goPostStatusFromDecline = this.postNotificationStatusDecline;
    goPostStatusFromDecline();
  };

  getProfileNotificationsData = (): void =>
    fetch(
      `http://activtie.com/api/inbox/{"user_id":${
        this.props.userId
      },"message_type":"join_request"}`,
      { method: 'GET' },
    )
      .then((response: any): void => response.json())
      .then((responseJson: any) => {
        const messageSend = this.props.getProfileNotificationsDataButton;
        messageSend(responseJson);
        const messageIdSend = this.props.getProfileNotificationsMessageId;
        messageIdSend(responseJson[0].message_id);
        const notificationSuccess = this.props
          .notificationsAvaibleCheckCompleted;
        notificationSuccess();
        // dispatch(ActivityActionCreators.getLatestActivityData(responseJson));
      })
      .catch(() => {
        const notificationFailed = this.props.notificationsAvaibleCheck;
        notificationFailed();
      });

  postNotificationStatusAccept = () => {
    fetch('http://activtie.com/api/answer_join', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.props.userId,
        message_id: this.props.notificationsMessageId,
        message_type: 'accept',
      }),
    })
      .then((response: any): any => {
        console.log(this.props.notificationsMessageType);
        console.log(response);
        return response.json();
      })
      .then((responseJson: any) => {
        const notificationsRequestKeeperButton = this.props.notificationsRequestKeeper;
        notificationsRequestKeeperButton(responseJson[0].result);
        console.log(responseJson);
        if (this.props.notificationsRequest === 'true' && this.props.notificationsMessageType === 'accept') {
          Alert.alert(
            'SUPERRR',
            'Katılma İsteğini Onayladin!',
            [
              {
                text: 'Tamam',
                onPress: (): void => console.log('Tamama Basıldı'),
              },
            ],
            { cancelable: false },
          );
          const goNull = this.props.notificationsMessageTypeNull;
          goNull('');
          const goGetAgain = this.getProfileNotificationsData;
          goGetAgain();
        } else if (this.props.notificationsRequest === 'true' && this.props.notificationsMessageType === 'decline') {
          Alert.alert(
            'Oopps',
            'Katılma İsteğini Reddettin!',
            [
              {
                text: 'Tamam',
                onPress: (): void => console.log('Tamama Basıldı'),
              },
            ],
            { cancelable: false },
          );
          const goNull2 = this.props.notificationsMessageTypeNull;
          goNull2('');
          const goGetAgain2 = this.getProfileNotificationsData;
          goGetAgain2();
        } else {
          console.log(this.props.notificationsRequest);
          const goNull3 = this.props.notificationsMessageTypeNull;
          goNull3('');
        }
        // dispatch(LoginActions.registerComplated());
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  postNotificationStatusDecline = () => {
    fetch('http://activtie.com/api/answer_join', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.props.userId,
        message_id: this.props.notificationsMessageId,
        message_type: 'decline',
      }),
    })
      .then((response: any): any => {
        console.log(this.props.notificationsMessageType);
        console.log(response);
        return response.json();
      })
      .then((responseJson: any) => {
        const notificationsRequestKeeperButton = this.props.notificationsRequestKeeper;
        notificationsRequestKeeperButton(responseJson[0].result);
        console.log(responseJson);
        if (this.props.notificationsRequest === 'true' && this.props.notificationsMessageType === 'accept') {
          Alert.alert(
            'SUPERRR',
            'Katılma İsteğini Onayladin!',
            [
              {
                text: 'Tamam',
                onPress: (): void => console.log('Tamama Basıldı'),
              },
            ],
            { cancelable: false },
          );
          const goNull = this.props.notificationsMessageTypeNull;
          goNull('');
          const goGetAgain = this.getProfileNotificationsData;
          goGetAgain();
        } else if (this.props.notificationsRequest === 'true' && this.props.notificationsMessageType === 'decline') {
          Alert.alert(
            'Oopps',
            'Katılma İsteğini Reddettin!',
            [
              {
                text: 'Tamam',
                onPress: (): void => console.log('Tamama Basıldı'),
              },
            ],
            { cancelable: false },
          );
          const goNull2 = this.props.notificationsMessageTypeNull;
          goNull2('');
          const goGetAgain2 = this.getProfileNotificationsData;
          goGetAgain2();
        } else {
          console.log(this.props.notificationsRequest);
          const goNull3 = this.props.notificationsMessageTypeNull;
          goNull3('');
        }
        // dispatch(LoginActions.registerComplated());
      })
      .catch((error: any) => {
        console.error(error);
      });
  };
  render(): React$Element< * > {
    if (this.props.isNotificationsAvaible) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold', color: 'black' }}>
            Bildiriminiz Bulunmuyor..
          </Text>
        </View>
      );
    }
    return (
      <CardItem>
        <FlatList
          data={this.props.profileNotificationsData}
          keyExtractor={(x: any, i: any): any => i}
          renderItem={({ item }: any): React$Element< * > => (
            <List>
              <ListItem>
                <Thumbnail
                  square
                  size={80}
                  source={{ uri: `http://activtie.com/${item.user_picture}` }}
                />
                <Body>
                  {/* <Text>
                    {` ${item.sender_name}`} {`${item.sender_surname}`}
                  </Text> */}
                  <Text>{item.message_info}</Text>
                </Body>
                <Button success onPress={this.onPressAcceptButton}>
                  <Icon name="checkmark-circle" />
                </Button>
                <Button danger onPress={this.onPressDeclineButton}>
                  <Icon name="close-circle" />
                </Button>
              </ListItem>
            </List>
          )}
        />
      </CardItem>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  getProfileNotificationsDataButton: (value: Object) => {
    dispatch(ProfileActionCreators.getProfileNotificationsData(value));
  },
  notificationsAvaibleCheckCompleted: () => {
    dispatch(ProfileActionCreators.notificationsAvaibleCheckCompleted());
  },
  notificationsAvaibleCheck: () => {
    dispatch(ProfileActionCreators.notificationsAvaibleCheck());
  },
  notificationsMessageTypeAccept: (value: Object) => {
    dispatch(ProfileActionCreators.notificationsMessageTypeAccept(value));
  },
  notificationsMessageTypeDecline: (value: Object) => {
    dispatch(ProfileActionCreators.notificationsMessageTypeDecline(value));
  },
  notificationsMessageTypeNull: (value: Object) => {
    dispatch(ProfileActionCreators.notificationsMessageTypeNull(value));
  },
  notificationsRequestKeeper: (value: Object) => {
    dispatch(ProfileActionCreators.notificationsRequestKeeper(value));
  },
  getProfileNotificationsMessageId: (value: Object) => {
    dispatch(ProfileActionCreators.getProfileNotificationsMessageId(value));
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  profileNotificationsData: state.profile.profileNotificationsData,
  userId: state.login.userId,
  isNotificationsAvaible: state.profile.isNotificationsAvaible,
  notificationsMessageType: state.profile.notificationsMessageType,
  notificationsRequest: state.profile.notificationsRequest,
  notificationsMessageId: state.profile.notificationsMessageId,
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
