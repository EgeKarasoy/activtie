// @flow

import React, { Component } from 'react';
import { Text, Image, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import {
  Container,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Thumbnail,
  Button,
  Icon,
  Header,
} from 'native-base';
import type { StateType } from '../Redux/index';
import ActivityActionCreators from '../Redux/ActivityRedux';
import ProfileActionCreators from '../Redux/ProfileRedux';
import ActivityMain from './ActivityMain';
import ActivityProfileCard from './ActivityProfileCard';

type ActivityJoinPropType = {
  goActivityJoinCompletedButton: Function,
  activityId: ?string,
  userId: ?string,
  getActivityJoinData: Function,
  activityJoinData: Array< mixed >,
  goActivityRequestButton: Function,
  goActivityProfileCardButton: Function,
  joinRequestKeeper: Function,
  joinRequest: ?string
};

class ActivityJoin extends Component<ActivityJoinPropType> {
  componentDidMount() {
    const activityJoin = this.getJoinedActivity;
    activityJoin();
    // console.disableYellowBox = true;
  }

  getJoinedActivity = (): void =>
    fetch(
      `http://activtie.com/api/activity_detail/{"activity_id":${
        this.props.activityId
      },"user_id":${this.props.userId}}`,
      { method: 'GET' },
    )
      .then((response: any): any => response.json())
      .then((responseJson: any) => {
        const joinSend = this.props.getActivityJoinData;
        joinSend(responseJson);
        // dispatch(ActivityActionCreators.getLatestActivityData(responseJson));
      })
      .catch((error: any) => {
        console.error(error);
      });

  postJoinRequest= () => {
    fetch('http://activtie.com/api/comment_and_join', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.props.userId,
        activity_id: this.props.activityId,
        message_info: '',
        message_type: 'join_request',
      }),
    })
      .then((response: any): any => {
        console.log(response);
        return response.json();
      })
      .then((responseJson: any) => {
        const joinRequestKeeperButton = this.props.joinRequestKeeper;
        joinRequestKeeperButton(responseJson[0].result);
        console.log(responseJson);
        if (this.props.joinRequest === 'true') {
          Alert.alert(
            'SUPERRR',
            'Katılma İsteğini Gönderdik!',
            [
              { text: 'Tamam', onPress: (): void => console.log('Tamama Basıldı') },
            ],
            { cancelable: false },
          )
        } else {
          Alert.alert(
            'Oopps',
            'Zaten bir katılma isteği gönderdin!',
            [
              { text: 'Tamam', onPress: (): void => console.log('Tamama Basıldı') },
            ],
            { cancelable: false },
          )
        }
        // dispatch(LoginActions.registerComplated());
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  render(): React$Element< * > {
    if (this.props.isGoActivityJoin === false) return <ActivityMain />;
    if (this.props.isGoActivityProfileCard) return <ActivityProfileCard />;
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={this.props.goActivityJoinCompletedButton}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
        </Header>
        <Card>
          <CardItem>
            <FlatList
              // numColumns={3}
              data={this.props.activityJoinData}
              keyExtractor={(x: any, i: any): any => i}
              renderItem={({ item }: any): React$Element< * > => (
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail
                        source={{ uri: `http://activtie.com/${item.user_picture}` }}
                      />
                      <Body>
                        <Text>{`${item.activity_name}`}</Text>
                        {/* <Text note style={{ fontStyle: 'italic' }}>
                          Açıklama: {`${item.activity_info}`}
                        </Text>
                        <Text note style={{ fontStyle: 'italic' }}>
                          Kategori:{` ${item.activity_category_type}`}, {`${item.activity_category_name}`}
                        </Text> */}
                        <Button
                          transparent
                          dark
                          onPress={(): void => this.props.goActivityProfileCardButton(item.creator_id)}
                        >
                          <Text style={{ fontWeight: 'bold', color: 'blue' }}>
                            Aktivite Sahibi:
                            <Text style={{ fontWeight: 'bold', color: 'black' }}>
                              {` ${item.creator_name}`}
                            </Text>
                          </Text>
                        </Button>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Body>
                        <Text note style={{ fontWeight: 'bold', color: 'red' }}>
                          <Icon active name="ios-information-circle" />  AÇIKLAMA:
                          <Text style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'black' }}>
                            {` ${item.activity_info}`}
                          </Text>
                        </Text>
                        <Text note style={{ fontWeight: 'bold', color: 'red' }}>
                          <Icon active name="folder" />  KATEGORİ:
                          <Text style={{ fontWeight: 'bold', color: 'black', fontStyle: 'italic' }}>
                            {` ${item.activity_category_type}`}, {`${item.activity_category_name}`}
                          </Text>
                        </Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Image
                      source={{
                        uri: `http://activtie.com/${item.activity_picture}`,
                      }}
                      style={{ height: 200, width: null, flex: 1 }}
                    >
                      <Image
                        source={{ uri: `${item.activity_picture}` }}
                        style={{ height: 200, width: null, flex: 1 }}
                      />
                    </Image>
                  </CardItem>
                  <Button
                    full
                    warning
                    onPress={this.postJoinRequest}
                  >
                    <Text> KATIL ! </Text>
                  </Button>
                  <CardItem>
                    <Left>
                      <Text>
                        <Icon active name="pin" />{` ${item.city_name}    `}
                        <Text>
                          <Icon active name="people" />{` ${item.activity_user_number}     `}
                          <Text>
                            <Icon active name="time" />{` ${item.activity_time}`}
                          </Text>
                        </Text>
                      </Text>
                    </Left>
                    {/* <Body>
                      <Text>
                        <Icon active name="people" /> {`${item.user_number}   `}
                        <Text>
                          <Icon active name="time" /> {`${item.creation_time}`}
                        </Text>
                      </Text>
                    </Body> */}
                    {/* <Right>
                      <Text>
                        <Icon active name="time" /> {`${item.creation_time}`}
                      </Text>
                    </Right> */}
                  </CardItem>
                </Card>
              )}
            />
          </CardItem>
        </Card>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  joinRequestKeeper: (value: Object) => {
    dispatch(ActivityActionCreators.joinRequestKeeper(value));
  },
  goActivityJoinCompletedButton: () => {
    dispatch(ActivityActionCreators.goActivityJoinCompleted());
  },
  goActivityProfileCardButton: (value: Object) => {
    dispatch(ActivityActionCreators.goActivityProfileCard(value));
    dispatch(ProfileActionCreators.goActivityDetailProfileCard(value));
  },
  getActivityJoinData: (value: Object) => {
    dispatch(ActivityActionCreators.getActivityJoinData(value));
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  activityId: state.activity.activityId,
  isGoActivityJoin: state.activity.isGoActivityJoin,
  userId: state.login.userId,
  activityJoinData: state.activity.activityJoinData,
  joinRequest: state.activity.joinRequest,
  isGoActivityProfileCard: state.activity.isGoActivityProfileCard,
  creatorId: state.activity.creatorId,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityJoin);
