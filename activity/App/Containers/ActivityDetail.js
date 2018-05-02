// @flow

import React, { Component } from 'react';
import { Text, Image, FlatList, View, Alert } from 'react-native';
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
  Content,
  List,
  ListItem,
  Header,
  Form,
  Textarea,
} from 'native-base';
import type { StateType } from '../Redux/index';
import ProfileActionCreators from '../Redux/ProfileRedux';
import ActivityActionCreators from '../Redux/ActivityRedux';
import MyActivities from './Profile/MyActivities';
import Profile from './Profile/Profile'
import ActivityDetailProfileCard from './ActivityProfileCard'

type ActivityDetailPropType = {
  goActivityCompletedFunc: Function,
  activityDetailId: ?string,
  userId: ?string,
  getActivityDetailData: Function,
  activityDetailData: Array< mixed >,
  getActivityDetailInCommentData: Function,
  activityDetailInCommentData: Array< mixed >,
  activityDetailMessageChange: Function,
  activityDetailMessage: ?string,
  activityMessageError: ?string,
  goActivityProfileCardButton: Function,
  inCommentAvaibleCheck: Function,
  inCommentAvaibleCheckCompleted: Function,
  activityDetailMessageChange: Function,
  activityDetailMessage: ?string,
  messageErrorChange: Function,
  messageError: ?string,
  isInCommentAvaible: ?string,
  getUsersInActivityData: Function,
  usersInActivityData: Array< mixed >
};

class ActivityDetail extends Component<ActivityDetailPropType> {
  componentDidMount() {
    const goActivityDetail = this.getActivityDetailData;
    goActivityDetail();
    const goActivityDetailInComment = this.getActivityDetailInComment;
    goActivityDetailInComment();
    const goUsersInActivity = this.getUsersInActivityData;
    goUsersInActivity();
    // console.disableYellowBox = true;
  }

  onPressButton= () => {
    if (this.props.activityDetailMessage.length < 3) {
      const messageError = this.props.messageErrorChange;
      messageError('Gecerli bir yorum girin..');
    } 
    else {
      const messageError2 = this.props.messageErrorChange;
      messageError2('');
      this.postActivityDetailMessage();
    }
  };

  getActivityDetailData = (): void =>
    fetch(
      `http://activtie.com/api/activity_detail/{"activity_id":${
        this.props.activityDetailId
      },"user_id":${this.props.userId}}`,
      { method: 'GET' },
    )
      .then((response: any): any => response.json())
      .then((responseJson: any) => {
        const detailSend = this.props.getActivityDetailData;
        detailSend(responseJson);
        // dispatch(ActivityActionCreators.getLatestActivityData(responseJson));
      })
      .catch((error: any) => {
        console.error(error);
      });

  getUsersInActivityData = (): void =>
    fetch(
      `http://activtie.com/api/users_in_activity/{"activity_id":${this.props.activityDetailId}}`,
      { method: 'GET' },
    )
      .then((response: any): any => response.json())
      .then((responseJson: any) => {
        const detailSend = this.props.getUsersInActivityData;
        detailSend(responseJson);
        // dispatch(ActivityActionCreators.getLatestActivityData(responseJson));
      })
      .catch((error: any) => {
        console.error(error);
      });

  getActivityDetailInComment = (): void =>
    fetch(`http://activtie.com/api/in_comments/{"activity_id":${this.props.activityDetailId}}`, {
      method: 'GET',
    })
      .then((response: any): any => response.json())
      .then((responseJson: any) => {
        const detailInCommentSend = this.props.getActivityDetailInCommentData;
        detailInCommentSend(responseJson);
        // dispatch(ActivityActionCreators.getLatestActivityData(responseJson));
        const inCommentSuccess = this.props.inCommentAvaibleCheck;
        inCommentSuccess('');
      })
      .catch(() => {
        const inCommentFailed = this.props.inCommentAvaibleCheck;
        inCommentFailed('Herhangi bir yorum yok..');
      });

  postActivityDetailMessage= () => {
    fetch('http://activtie.com/api/comment_and_join', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.props.userId,
        activity_id: this.props.activityDetailId,
        message_info: this.props.activityDetailMessage,
        message_type: 'in_comment',
      }),
    })
      .then((response: any): any => {
        console.log(response);
        return response.json();
      })
      .then((responseJson: any) => {
        console.log(responseJson[0].result);
        if (responseJson[0].result === 'true') {
          Alert.alert(
            'SUPERRR',
            'Yorumu Gönderdik!',
            [
              {
                text: 'Tamam',
                onPress: (): void => console.log('Tamama Basıldı'),
              },
            ],
            { cancelable: false },
          );
          const goActivityDetailInComment2 = this.getActivityDetailInComment;
          goActivityDetailInComment2();
        } else {
          Alert.alert(
            'Oopps',
            'Yorumu Gonderemedik, Tekrar Dene !',
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
    if (this.props.isGoActivityDetail === false) return <Profile />;
    if (this.props.isGoActivityProfileCard) return <ActivityDetailProfileCard />;
    // if (this.props.isInCommentAvaible) {
    //   return (
    //     this.props.activityDetailInCommentData.info
    //   );
    return (
      <Content>
        <View>
          <Header>
            <Left>
              <Button
                transparent
                onPress={this.props.goActivityCompletedFunc}
              >
                <Icon name="arrow-back" />
              </Button>
            </Left>
          </Header>
          <CardItem>
            <FlatList
              data={this.props.activityDetailData}
              keyExtractor={(x: any, i: any): any => i}
              renderItem={({ item }: any): React$Element< * > => (
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail
                        source={{
                          uri: `http://activtie.com/${item.user_picture}`,
                        }}
                      />
                      <Body>
                        <Text style={{ fontWeight: 'bold' }}>{`${
                          item.activity_name
                        }`}
                        </Text>
                        {/* <Text note style={{ fontStyle: 'italic' }}>
                          Kategori: {`${item.activity_category_name}`}
                        </Text> */}
                        <Button
                          transparent
                          dark
                          onPress={(): void => this.props.goActivityProfileCardButton(item.creator_id)}
                        >
                          <Text style={{ fontWeight: 'bold', color: 'blue' }}>
                            {`${item.creator_name}`}
                          </Text>
                        </Button>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Body>
                        <Text note style={{ fontWeight: 'bold', color: 'red' }}>
                          <Icon active name="ios-information-circle" />{' '}
                          AÇIKLAMA:
                          <Text
                            style={{
                              fontWeight: 'bold',
                              fontStyle: 'italic',
                              color: 'black',
                            }}
                          >
                            {` ${item.activity_info}`}
                          </Text>
                        </Text>
                        <Text note style={{ fontWeight: 'bold', color: 'red' }}>
                          <Icon active name="folder" /> KATEGORİ:
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: 'black',
                              fontStyle: 'italic',
                            }}
                          >
                            {` ${item.activity_category_type}`},{' '}
                            {`${item.activity_category_name}`}
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
                    />
                  </CardItem>
                  {/* <Button
                    full
                    warning
                    onPress={(): void =>
                      this.props.goActivityDetailButton(item.activity_id)
                    }
                  >
                    <Text> AKTIVITENE GIT ! </Text>
                  </Button> */}
                  <CardItem>
                    <Left>
                      <Text>
                        <Icon active name="pin" />
                        {` ${item.city_name}   `}
                        <Text>
                          <Icon active name="people" />
                          {` ${item.activity_user_number}   `}
                          <Text>
                            <Icon active name="time" />
                            {` ${item.activity_time}`}
                          </Text>
                        </Text>
                      </Text>
                    </Left>
                  </CardItem>
                </Card>
              )}
            />
          </CardItem>
          <Text style={{ fontWeight: 'bold' }}>  Katılımcılar </Text>
          <CardItem>
            <FlatList
              numColumns={5}
              data={this.props.usersInActivityData}
              keyExtractor={(x: any, i: any): any => i}
              renderItem={({ item }: any): React$Element< * > => (
                <List>
                  <ListItem avatar>
                    <Left>
                      <Thumbnail
                        source={{ uri: `http://activtie.com/${item.user_picture}` }}
                      />
                    </Left>
                  </ListItem>
                </List>
              )}
            />
          </CardItem>
          <Text style={{ fontWeight: 'bold' }}>  Yorumlar </Text>
          <CardItem>
            <Text style={{ color: 'red', fontWeight: 'bold' }}>
              {this.props.isInCommentAvaible}
            </Text>
            <FlatList
              data={this.props.activityDetailInCommentData}
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
                      <Text style={{ fontWeight: 'bold' }}>
                        {` ${item.sender_name}`} {`${item.sender_surname}`}
                      </Text>
                      <Text note>{` ${item.info}`}</Text>
                      <Text note>✓{` ${item.comment_time}`}</Text>
                    </Body>
                    {/* <Right>
                      <Text note>{` ${item.message_time}`}</Text>
                    </Right> */}
                  </ListItem>
                </List>
              )}
            />
          </CardItem>
          <Content padder>
            <Text style={{ fontWeight: 'bold' }}> Mesajını Yaz </Text>
            <Form>
              <Textarea
                rowSpan={3}
                bordered
                placeholder="Etkinligi heyecanla bekliyorum.."
                autoCorrect={false}
                onChangeText={this.props.activityDetailMessageChange}
                value={this.props.activityDetailMessage}
              />
            </Form>
            <Button full warning onPress={this.onPressButton}>
              <Text>GÖNDER</Text>
            </Button>
            <Text style={{ color: 'red', fontWeight: 'bold' }}>
              {this.props.messageError}
            </Text>
          </Content>
        </View>
      </Content>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  goActivityCompletedFunc: () => {
    dispatch(ProfileActionCreators.goActivityDetailCompleted());
  },
  getActivityDetailData: (value: Object) => {
    dispatch(ProfileActionCreators.getActivityDetailData(value));
  },
  getActivityDetailInCommentData: (value: Object) => {
    dispatch(ProfileActionCreators.getActivityDetailInCommentData(value));
  },
  goActivityProfileCardButton: (value: Object) => {
    dispatch(ActivityActionCreators.goActivityProfileCard(value));
    dispatch(ProfileActionCreators.goActivityDetailProfileCard(value));
  },
  inCommentAvaibleCheck: (value: Object) => {
    dispatch(ProfileActionCreators.inCommentAvaibleCheck(value));
  },
  activityDetailMessageChange: (value: Object) => {
    dispatch(ProfileActionCreators.activityDetailMessageChange(value));
  },
  messageErrorChange: (value: Object) => {
    dispatch(ProfileActionCreators.messageErrorChange(value));
  },
  getUsersInActivityData: (value: Object) => {
    dispatch(ProfileActionCreators.getUsersInActivityData(value));
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  isGoActivityDetail: state.profile.isGoActivityDetail,
  activityDetailId: state.profile.activityDetailId,
  userId: state.login.userId,
  activityDetailData: state.profile.activityDetailData,
  activityDetailInCommentData: state.profile.activityDetailInCommentData,
  isGoActivityProfileCard: state.activity.isGoActivityProfileCard,
  creatorId: state.activity.creatorId,
  isInCommentAvaible: state.profile.isInCommentAvaible,
  activityDetailMessage: state.profile.activityDetailMessage,
  messageError: state.profile.messageError,
  usersInActivityData: state.profile.usersInActivityData,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetail);
