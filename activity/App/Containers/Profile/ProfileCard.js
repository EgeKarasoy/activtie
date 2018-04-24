// @flow

import React, { Component } from 'react'
import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Icon } from 'react-native-elements'
import {
  TabViewAnimated,
  TabBar,
  TabViewPagerScroll,
  TabViewPagerPan,
} from 'react-native-tab-view'
import PropTypes from 'prop-types'
import SendMessageProfile from './SendMessageProfile'
import ProfileCardInfo from './ProfileCardInfo'

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

export default class ProfileCard extends Component<*> {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    tabContainerStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),
    posts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      words: PropTypes.string.isRequired,
      sentence: PropTypes.string.isRequired,
      paragraph: PropTypes.string.isRequired,
      image: PropTypes.string,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }),
    })).isRequired,
  }

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

  onPressPlace = () => {
    console.log('place')
  }

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
        return <SendMessageProfile containerStyle={styles.sceneContainer} />
      case '2':
        return <ProfileCardInfo containerStyle={styles.sceneContainer} />
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
    const { avatar, name, bio } = this.props
    return (
      <View style={styles.headerContainer}>
        <View style={styles.userRow}>
          <Image
            style={styles.userImage}
            source={{
              uri: avatar,
            }}
          />
          <View style={styles.userNameRow}>
            <Text style={styles.userNameText}>{name}</Text>
          </View>
          <View style={styles.userBioRow}>
            <Text style={styles.userBioText}>{bio}</Text>
          </View>
        </View>
        <View style={styles.socialRow}>
          <View>
            <Icon
              size={30}
              type="entypo"
              color="#3B5A98"
              name="facebook-with-circle"
              onPress={(): void => console.log('facebook')}
            />
          </View>
          <View style={styles.socialIcon}>
            <Icon
              size={30}
              type="entypo"
              color="#56ACEE"
              name="twitter-with-circle"
              onPress={(): void => console.log('twitter')}
            />
          </View>
          <View>
            <Icon
              size={30}
              type="entypo"
              color="#DD4C39"
              name="instagram-with-circle"
              onPress={(): void => console.log('instagram')}
            />
          </View>
        </View>
      </View>
    )
  }

  render(): React$Element< * > {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
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
