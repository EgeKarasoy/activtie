// @flow

import React, { Component } from 'react'
import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native'
import { Icon } from 'react-native-elements'
import {
  TabViewAnimated,
  TabBar,
  TabViewPagerScroll,
  TabViewPagerPan,
} from 'react-native-tab-view'
import {
  Left,
  Button,
  Header,
  CardItem,
} from 'native-base';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import type { StateType } from '../Redux/index';
import ActivityActionCreators from '../Redux/ActivityRedux';
import ProfileActionCreators from '../Redux/ProfileRedux';
import ActivitySendMessageProfile from './ActivitySendMessageProfile';
import ActivityProfileCardInfo from './ActivityProfileCardInfo';
import ActivityJoin from './ActivityJoin';
import ActivityDetail from './ActivityDetail';

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 10,
    marginTop: 45,
  },
  indicatorTab: {
    backgroundColor: 'transparent',
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  sceneContainer: {
    marginTop: 10,
  },
  socialIcon: {
    marginLeft: 14,
    marginRight: 14,
  },
  socialRow: {
    flexDirection: 'row',
  },
  tabBar: {
    backgroundColor: '#EEE',
  },
  tabContainer: {
    flex: 1,
    marginBottom: 12,
  },
  tabLabelNumber: {
    color: 'gray',
    fontSize: 12.5,
    textAlign: 'center',
  },
  tabLabelText: {
    color: 'black',
    fontSize: 22.5,
    fontWeight: '600',
    textAlign: 'center',
  },
  userBioRow: {
    marginLeft: 40,
    marginRight: 40,
  },
  userBioText: {
    color: 'gray',
    fontSize: 13.5,
    textAlign: 'center',
  },
  userImage: {
    borderRadius: 60,
    height: 110,
    marginBottom: 10,
    width: 110,
  },
  userNameRow: {
    marginBottom: 10,
  },
  userNameText: {
    color: '#5B5A5A',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 12,
  },
})

type ActivityProfileCardPropType = {
  userId: ?string,
  goActivityProfileCardButton: Function,
  getActivityProfileCardData: Function,
  creatorId: ?string,
  goActivityProfileCardCompletedButton: Function,
  containerStyle: any,
  tabContainerStyle: any,
  activityProfileCardData: Array< mixed >,
  activityPicture: ?string,
  picture: ?string
};

class ActivityProfileCard extends Component<ActivityProfileCardPropType> {
  static defaultProps = {
    containerStyle: {},
    tabContainerStyle: {},
  }

  state = {
    tabs: {
      index: 0,
      routes: [
        { key: '1', title: 'Mesaj At', icon: 'inbox' },
        { key: '2', title: 'Bilgiler', icon: 'info' },
      ],
    },
  }

  componentDidMount() {
    const activityProfileCardGoing = this.getActivityProfileCardData;
    activityProfileCardGoing();
    // console.disableYellowBox = true;
  }

  getActivityProfileCardData = (): void =>
    fetch(
      `http://activtie.com/api/profile/{"visitor_id":${
        this.props.userId
      },"visited_id":${this.props.creatorId}}`,
      { method: 'GET' },
    )
      .then((response: any): any => response.json())
      .then((responseJson: any) => {
        const activityProfilSend = this.props.getActivityProfileCardData;
        activityProfilSend(responseJson);
        // dispatch(ActivityActionCreators.getLatestActivityData(responseJson));
      })
      .catch((error: any) => {
        console.error(error);
      });

  handleIndexChange = (index: any) => {
    this.setState({
      tabs: {
        ...this.state.tabs,
        index,
      },
    })
  }

  renderHeader = (props: any): React$Element< * > => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorTab}
      renderLabel={this.renderLabel(props)}
      pressOpacity={0.8}
      style={styles.tabBar}
    />
  )

  renderScene = ({ route: { key } }: any): React$Element< * > => {
    // const { posts } = this.props
    switch (key) {
      case '1':
        return <ActivitySendMessageProfile containerStyle={styles.sceneContainer} />
      case '2':
        return <ActivityProfileCardInfo containerStyle={styles.sceneContainer} />
      // case '3':
      //   return <MyActivities containerStyle={styles.sceneContainer} />
      // case '4':
      //   return <Information containerStyle={styles.sceneContainer} />
      default:
        return <View />
    }
  }

  renderLabel = (props: any): any => ({ route, index }: any): React$Element< * > => {
    const inputRange = props.navigationState.routes.map((x: any, i: any): any => i)
    const outputRange = inputRange.map((inputIndex: any): any => (inputIndex === index ? 'black' : 'gray'))
    const color = props.position.interpolate({
      inputRange,
      outputRange,
    })
    return (
      <View>
        <Icon name={route.icon} />
        <Animated.Text style={[styles.tabLabelNumber, { color }]}>
          {route.title}
        </Animated.Text>
      </View>
    )
  }

  renderPager = (props: any): React$Element< * > => (Platform.OS === 'ios' ? (
    <TabViewPagerScroll {...props} />
  ) : (
    <TabViewPagerPan {...props} />
  ))

  renderContactHeader = (): React$Element< * > => {
    // const { avatar, name, bio } = this.props
    return (
      <CardItem>
        <FlatList
          data={this.props.activityProfileCardData}
          keyExtractor={(x: any, i: any): any => i}
          renderItem={({ item }: any): React$Element< * > => (
            <View style={styles.headerContainer}>
              <View style={styles.userRow}>
                <Image
                  source={require('./LoginPage/images/no_avatar.jpg')}
                  style={styles.userImage}
                >
                  <Image
                    style={styles.userImage}
                    source={{ uri: `${this.props.picture}` }}
                  >
                    <Image
                      style={styles.userImage}
                      source={{ uri: `http://activtie.com/${item.user_picture}` }}
                    />
                  </Image>
                </Image>
                <View style={styles.userNameRow}>
                  <Text style={styles.userNameText}>{` ${item.user_name}`}{` ${item.user_surname}`}</Text>
                </View>
                <View style={styles.userBioRow}>
                  <Text style={styles.userBioText}>{` ${item.user_info}`}</Text>
                </View>
              </View>
              <View style={styles.socialRow}>
                <View>
                  <Icon
                    size={30}
                    type="entypo"
                    color="#3B5A98"
                    name="facebook-with-circle"
                    onPress={(): void => console.log(` ${item.user_facebook}`)}
                  />
                </View>
                <View style={styles.socialIcon}>
                  <Icon
                    size={30}
                    type="entypo"
                    color="#56ACEE"
                    name="twitter-with-circle"
                    onPress={(): void => console.log(` ${item.user_twitter}`)}
                  />
                </View>
                <View>
                  <Icon
                    size={30}
                    type="entypo"
                    color="#DD4C39"
                    name="instagram-with-circle"
                    onPress={(): void => console.log(` ${item.user_instagram}`)}
                  />
                </View>
              </View>
            </View>
          )}
        />
      </CardItem>
    )
  }

  render(): React$Element< * > {
    if (this.props.isGoActivityProfileCard === false) return <ActivityJoin />;
    if (this.props.isGoActivityDetailProfileCard === false) return <ActivityDetail />;
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <Header>
          <Left>
            <Button transparent onPress={this.props.goActivityProfileCardCompletedButton}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
        </Header>
        <View style={styles.cardContainer}>
          {this.renderContactHeader()}
          <TabViewAnimated
            style={[styles.tabContainer, this.props.tabContainerStyle]}
            navigationState={this.state.tabs}
            renderScene={this.renderScene}
            renderPager={this.renderPager}
            renderHeader={this.renderHeader}
            onIndexChange={this.handleIndexChange}
          />
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  goActivityProfileCardCompletedButton: () => {
    dispatch(ActivityActionCreators.goActivityProfileCardCompleted());
    dispatch(ProfileActionCreators.goActivityDetailProfileCardCompleted());
  },
  getActivityProfileCardData: (value: Object) => {
    dispatch(ActivityActionCreators.getActivityProfileCardData(value));
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  userId: state.login.userId,
  isGoActivityProfileCard: state.activity.isGoActivityProfileCard,
  creatorId: state.activity.creatorId,
  activityProfileCardData: state.activity.activityProfileCardData,
  isGoActivityDetailProfileCard: state.profile.isGoActivityDetailProfileCard,
  picture: state.login.picture,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityProfileCard);
