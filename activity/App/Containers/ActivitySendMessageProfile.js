// @flow

import React, { Component } from 'react';
import { Alert } from 'react-native';
import {
  Container,
  Content,
  Text,
  Textarea,
  Form,
  Button,
  Header,
} from 'native-base';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import type { StateType } from '../Redux/index';
import ActivityActionCreators from '../Redux/ActivityRedux';

type SendMessageProfilePropType = {
  activityMessageChange: Function,
  activityMessage: ?string,
  activityMessageErrorChange: Function,
  activityMessageError: ?string,
  userId: ?string,
  creatorId: ?string,
  activityMessageRequestKeeper: Function
};

class ActivitySendMessageProfile extends Component<SendMessageProfilePropType> {
  onPressButton = () => {
    if (this.props.activityMessage.length < 3) {
      const nameError = this.props.activityMessageErrorChange;
      nameError('Gecerli bir mesaj girin..');
    } else {
      const errorClear = this.props.activityMessageErrorChange;
      errorClear('');
      this.buttonPress();
    }
  };

  buttonPress = () => {
    fetch('http://activtie.com/api/send_message', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender_id: this.props.userId,
        receiver_id: this.props.creatorId,
        message_info: this.props.activityMessage,
      }),
    })
      .then((response: any): any => {
        console.log(response);
        return response.json();
      })
      .then((responseJson: any) => {
        const activityMessageRequestKeeperButton = this.props.activityMessageRequestKeeper;
        activityMessageRequestKeeperButton(responseJson[0].result);
        console.log(responseJson);
        if (this.props.activityMessageRequest === 'true') {
          Alert.alert(
            'SUPERRR',
            'Mesajini Gönderdik!',
            [
              {
                text: 'Tamam',
                onPress: (): void => console.log('Tamama Basıldı'),
              },
            ],
            { cancelable: false },
          );
        } else {
          Alert.alert(
            'Oopps',
            'Mesajini Gonderemedik, Tekrar Dene !',
            [
              {
                text: 'Tamam',
                onPress: (): void => console.log('Tamama Basıldı'),
              },
            ],
            { cancelable: false },
          );
        }

        // dispatch(LoginActions.registerComplated());
      })
      .catch((error: any) => {
        console.error(error);
      });
  };
  render(): React$Element< * > {
    return (
      <Container>
        <Content padder>
          <Text style={{ fontWeight: 'bold' }}> Mesajını Yaz </Text>
          <Form>
            <Textarea
              rowSpan={3}
              bordered
              placeholder="Etkinliğine Katılabilir miyim ?"
              autoCorrect={false}
              onChangeText={this.props.activityMessageChange}
              value={this.props.activityMessage}
            />
          </Form>
          <Button full warning onPress={this.onPressButton}>
            <Text>GÖNDER</Text>
          </Button>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>
            {this.props.activityMessageError}
          </Text>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  activityMessageChange: (value: Object) => {
    dispatch(ActivityActionCreators.activityMessageChange(value));
  },
  activityMessageErrorChange: (value: Object) => {
    dispatch(ActivityActionCreators.activityMessageErrorChange(value));
  },
  activityMessageRequestKeeper: (value: Object) => {
    dispatch(ActivityActionCreators.activityMessageRequestKeeper(value));
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  activityProfileCardData: state.activity.activityProfileCardData,
  activityMessage: state.activity.activityMessage,
  activityMessageError: state.activity.activityMessageError,
  userId: state.login.userId,
  creatorId: state.activity.creatorId,
  activityMessageRequest: state.activity.activityMessageRequest,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivitySendMessageProfile);
