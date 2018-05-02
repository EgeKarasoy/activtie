// @flow

import React, { Component } from 'react';
import { FlatList, View, Image } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
  Icon,
  Left,
  Thumbnail,
} from 'native-base';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import type { StateType } from '../../Redux/index';
import ProfileActionCreators from '../../Redux/ProfileRedux';
import ActivityDetail from '../ActivityDetail';
import IndexCard from '../Profile/IndexCard';

type MyActivitiesPropType = {
  goActivityDetailButton: Function,
  goProfileCardButton: Function,
  getMyActivitiesJoinedData: Function,
  getMyActivitiesCreatedData: Function,
  myActivitiesJoinedData: Array< mixed >,
  myActivitiesCreatedData: Array< mixed >,
  myActivitiesJoinedCheck: Function,
  myActivitiesCreatedCheck: Function,
  myActivitiesJoinedCheckCompleted: Function,
  myActivitiesCreatedCheckCompleted: Function,
  userId: ?string
};

class MyActivities extends Component<MyActivitiesPropType> {
  componentDidMount() {
    const goActivitiesJoined = this.getMyActivitiesJoined;
    goActivitiesJoined();
    const goActivitiesCreated = this.getMyActivitiesCreated;
    goActivitiesCreated();
    // console.disableYellowBox = true;
  }

  getMyActivitiesJoined = (): void =>
    fetch(
      `http://activtie.com/api/joined_activities/{"user_id":${
        this.props.userId
      }}`,
      { method: 'GET' },
    )
      .then((response: any): any => response.json())
      .then((responseJson: any) => {
        const joinedSend = this.props.getMyActivitiesJoinedData;
        joinedSend(responseJson);
        const joinedSuccess = this.props.myActivitiesJoinedCheckCompleted;
        joinedSuccess();
        // dispatch(ActivityActionCreators.getLatestActivityData(responseJson));
      })
      .catch(() => {
        const joinedFailed = this.props.myActivitiesJoinedCheck;
        joinedFailed();
      });

  getMyActivitiesCreated = (): void =>
    fetch(
      `http://activtie.com/api/created_activities/{"user_id":${
        this.props.userId
      }}`,
      { method: 'GET' },
    )
      .then((response: any): any => response.json())
      .then((responseJson: any) => {
        const createdSend = this.props.getMyActivitiesCreatedData;
        createdSend(responseJson);
        const createdSuccess = this.props.myActivitiesCreatedCheckCompleted;
        createdSuccess();
        // dispatch(ActivityActionCreators.getLatestActivityData(responseJson));
      })
      .catch(() => {
        const createdFailed = this.props.myActivitiesCreatedCheck;
        createdFailed();
      });
  render(): React$Element< * > {
    if (this.props.isActivitiesJoined && this.props.isActivitiesCreated) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold', color: 'black' }}>
            Aktiviteniz Bulunmuyor..
          </Text>
        </View>
      );
    }
    if (this.props.isGoProfileCard) return <IndexCard />;
    return (
      <Content>
        <View>
          <CardItem>
            <FlatList
              data={this.props.myActivitiesJoinedData}
              keyExtractor={(x: any, i: any): any => i}
              renderItem={({ item }: any): React$Element< * > => (
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail source={require('../../Images/activtielogo.jpeg')} />
                      <Body>
                        <Text>{`${item.activity_name}`}</Text>
                        <Text note style={{ fontStyle: 'italic' }}>
                                Kategori: {`${item.category_name}`}
                        </Text>
                        {/* <Button
                              transparent
                              dark
                              onPress={this.props.goProfileCardButton}
                            >
                              <Text style={{ fontWeight: 'bold', color: 'blue' }}>
                                  Ege Karasoy
                              </Text>
                            </Button> */}
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Image
                      source={{ uri: `http://activtie.com/${item.activity_picture}` }}
                      style={{ height: 200, width: null, flex: 1 }}
                    />
                  </CardItem>
                  <Button full warning onPress={(): void => this.props.goActivityDetailButton(item.activity_id)}>
                    <Text> AKTIVITENE GIT ! </Text>
                  </Button>
                  <CardItem>
                    <Left>
                      <Text>
                        <Icon active name="pin" />{` ${item.activity_city}    `}
                        <Text>
                          <Icon active name="people" />{` ${item.user_number}     `}
                          <Text>
                            <Icon active name="time" />{` ${item.creation_time}`}
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
          <CardItem>
            <FlatList
                  // numColumns={3}
              data={this.props.myActivitiesCreatedData}
              keyExtractor={(x: any, i: any): any => i}
              renderItem={({ item }: any): React$Element< * > => (
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail source={require('../../Images/activtielogo.jpeg')} />
                      <Body>
                        <Text>{`${item.activity_name}`}</Text>
                        <Text note style={{ fontStyle: 'italic' }}>
                                Kategori: {`${item.category_name}`}
                        </Text>
                        {/* <Button
                              transparent
                              dark
                              onPress={this.props.goProfileCardButton}
                            >
                              <Text style={{ fontWeight: 'bold', color: 'blue' }}>
                                  Ege Karasoy
                              </Text>
                            </Button> */}
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Image
                      source={{ uri: `http://activtie.com/${item.activity_picture}` }}
                      style={{ height: 200, width: null, flex: 1 }}
                    />
                  </CardItem>
                  <Button full warning onPress={(): void => this.props.goActivityDetailButton(item.activity_id)}>
                    <Text> AKTIVITENE GIT ! </Text>
                  </Button>
                  <CardItem>
                    <Left>
                      <Text>
                        <Icon active name="pin" />{` ${item.activity_city}    `}
                        <Text>
                          <Icon active name="people" />{` ${item.user_number}     `}
                          <Text>
                            <Icon active name="time" />{` ${item.creation_time}`}
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
        </View>
      </Content>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  goActivityDetailButton: (value: Object) => {
    dispatch(ProfileActionCreators.goActivityDetail(value));
  },
  goProfileCardButton: () => {
    dispatch(ProfileActionCreators.goProfileCard());
  },
  getMyActivitiesJoinedData: (value: Object) => {
    dispatch(ProfileActionCreators.getMyActivitiesJoinedData(value));
  },
  getMyActivitiesCreatedData: (value: Object) => {
    dispatch(ProfileActionCreators.getMyActivitiesCreatedData(value));
  },
  myActivitiesJoinedCheck: () => {
    dispatch(ProfileActionCreators.myActivitiesJoinedCheck());
  },
  myActivitiesJoinedCheckCompleted: () => {
    dispatch(ProfileActionCreators.myActivitiesJoinedCheckCompleted());
  },
  myActivitiesCreatedCheck: () => {
    dispatch(ProfileActionCreators.myActivitiesCreatedCheck());
  },
  myActivitiesCreatedCheckCompleted: () => {
    dispatch(ProfileActionCreators.myActivitiesCreatedCheckCompleted());
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  isGoActivityDetail: state.profile.isGoActivityDetail,
  isGoProfileCard: state.profile.isGoProfileCard,
  userId: state.login.userId,
  myActivitiesJoinedData: state.profile.myActivitiesJoinedData,
  myActivitiesCreatedData: state.profile.myActivitiesCreatedData,
  isActivitiesJoined: state.profile.isActivitiesJoined,
  isActivitiesCreated: state.profile.isActivitiesCreated,
  activityDetailId: state.profile.activityDetailId,
});

export default connect(mapStateToProps, mapDispatchToProps)(MyActivities);
