// @flow

import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import { Content, Button, Left, Right, CardItem, Thumbnail, Body, Icon } from 'native-base';
import Slideshow from 'react-native-slideshow';
import Category from 'react-native-category';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import type { StateType } from '../Redux/index';
import ProfileActionCreators from '../Redux/ProfileRedux';
import ActivityActionCreators from '../Redux/ActivityRedux';
import ActivityHeader from './ActivityHeader';
import IndexCard from './Profile/IndexCard';
import AllCities from './AllCities'

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'ios' ? 64 : 44,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 30 : 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  sectionStyles: {
    marginTop: 20,
  },
  title: {
    marginLeft: 8,
    marginBottom: 2,
    color: 'white',
  },
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

type ActivityMainPropType = {
  goProfileCardButton: Function,
  goAllCitiesButton: Function
};

class ActivityMain extends Component<ActivityMainPropType> {
  constructor(props: any) {
    super(props);

    this.arrImage2 = [
      'ios-football',
      'ios-people',
      'ios-cart',
      'ios-cafe',
      'ios-plane',
      'ios-walk',
    ];

    this.state = {
      position: 1,
      interval: null,
      dataSource: [
        {
          title: 'Kordonda midye-bira',
          caption: 'Izmir',
          url: 'http://placeimg.com/640/480/any',
        },
        {
          title: 'Gece Yanlayalim',
          caption: 'Istanbul',
          url: 'http://placeimg.com/640/480/any',
        },
        {
          title: 'Anitkabire Yuruyus',
          caption: 'Ankara',
          url: 'http://placeimg.com/640/480/any',
        },
      ],
    };
  }

  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.state.dataSource.length
              ? 0
              : this.state.position + 1,
        });
      }, 5000),
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  itemTextChoose(item) {
    // alert(item.title);
  }

  itemIconChoose(item) {
    // alert(`icon ${item.index}`);
  }

  render(): React$Element< * > {
    if (this.props.isGoProfileCard) return <IndexCard />;
    if (this.props.isGoAllCities) return <AllCities />;
    
    return (
      <Content>
        <ActivityHeader />
        <Text style={{ fontWeight: 'bold' }}>    Populer Aktiviteler</Text>
        <Slideshow
          dataSource={this.state.dataSource}
          position={this.state.position}
          onPositionChanged={position => this.setState({ position })}
          onPress={null}
        />
        <View>
          <View style={styles.sectionStyles}>
            <Text style={{ fontWeight: 'bold' }}>    Kategoriler</Text>
            <Category
              style={{ backgroundColor: 'white' }}
              imageData={this.arrImage2}
              iconSet="Ionicons"
              iconSize={40}
              itemStyles={{
                paddingLeft: 16,
                paddingRight: 16,
                borderRadius: 32,
              }}
              colorItemDefault="gray"
              colorItemSelected="#FF4E50"
              itemSelected={item => this.itemIconChoose(item)}
            />
          </View>
          <CardItem>
            <Left>
              <Text style={{ fontWeight: 'bold' }}>Populer Sehirler</Text>
            </Left>
            <Right>
              <Button
                small
                style={{ backgroundColor: 'transparent', alignItems: 'flex-end', justifyContent: 'flex-end' }}
                onPress={this.props.goAllCitiesButton}
              >
                <Text>Tümünü Gör</Text>
              </Button>
            </Right>
          </CardItem>
          <View style={styles.itemContainer}>
            <Image
              source={require('../Images/izmir.jpg')}
              style={{ height: 150, width: 100 }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}
              >
                <Button small full dark>
                  <Text style={{ color: 'white' }}>Izmir</Text>
                </Button>
              </View>
            </Image>
            <Image
              source={require('../Images/istanbul.jpg')}
              style={{ height: 150, width: 100 }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}
              >
                <Button small full dark>
                  <Text style={{ color: 'white' }}>Istanbul</Text>
                </Button>
              </View>
            </Image>
            <Image
              source={require('../Images/ankara.jpg')}
              style={{ height: 150, width: 100 }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}
              >
                <Button small full dark>
                  <Text style={{ color: 'white' }}>Ankara</Text>
                </Button>
              </View>
            </Image>
          </View>
          <Text style={{ fontWeight: 'bold' }}>    Sana Özel Aktiviteler</Text>
          <CardItem>
            <Left>
              <Thumbnail source={require('../Images/egekrsy.jpg')} />
              <Body>
                <Text>Duman Bahar Konseri</Text>
                <Text note style={{ fontStyle: 'italic' }}>
                    Beraber gidecegim arkadaş arıyorum
                </Text>
                <Button
                  transparent
                  dark
                  onPress={this.props.goProfileCardButton}
                >
                  <Text style={{ fontWeight: 'bold', color: 'blue' }}>
                      Ege Karasoy
                  </Text>
                </Button>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={require('../Images/concert.jpg')}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>
          <Button full warning>
            <Text> KATIL !</Text>
          </Button>
          <CardItem>
            <Left>
              <Text>
                <Icon active name="pin" /> Izmir
              </Text>
            </Left>
            <Body>
              <Text>
                <Icon active name="people" /> 4 Kisi
              </Text>
            </Body>
            <Right>
              <Text>
                <Icon active name="time" /> 19:00
              </Text>
            </Right>
          </CardItem>
          <CardItem>
            <Left>
              <Thumbnail source={require('../Images/egekrsy.jpg')} />
              <Body>
                <Text>Duman Bahar Konseri</Text>
                <Text note style={{ fontStyle: 'italic' }}>
                    Beraber gidecegim arkadaş arıyorum
                </Text>
                <Button
                  transparent
                  dark
                  onPress={this.props.goProfileCardButton}
                >
                  <Text style={{ fontWeight: 'bold', color: 'blue' }}>
                      Ege Karasoy
                  </Text>
                </Button>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={require('../Images/concert.jpg')}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>
          <Button full warning>
            <Text> KATIL !</Text>
          </Button>
          <CardItem>
            <Left>
              <Text>
                <Icon active name="pin" /> Izmir
              </Text>
            </Left>
            <Body>
              <Text>
                <Icon active name="people" /> 4 Kisi
              </Text>
            </Body>
            <Right>
              <Text>
                <Icon active name="time" /> 19:00
              </Text>
            </Right>
          </CardItem>
          <CardItem>
            <Left>
              <Thumbnail source={require('../Images/egekrsy.jpg')} />
              <Body>
                <Text>Duman Bahar Konseri</Text>
                <Text note style={{ fontStyle: 'italic' }}>
                    Beraber gidecegim arkadaş arıyorum
                </Text>
                <Button
                  transparent
                  dark
                  onPress={this.props.goProfileCardButton}
                >
                  <Text style={{ fontWeight: 'bold', color: 'blue' }}>
                      Ege Karasoy
                  </Text>
                </Button>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={require('../Images/concert.jpg')}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>
          <Button full warning>
            <Text> KATIL !</Text>
          </Button>
          <CardItem>
            <Left>
              <Text>
                <Icon active name="pin" /> Izmir
              </Text>
            </Left>
            <Body>
              <Text>
                <Icon active name="people" /> 4 Kisi
              </Text>
            </Body>
            <Right>
              <Text>
                <Icon active name="time" /> 19:00
              </Text>
            </Right>
          </CardItem>
        </View>
      </Content>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  goProfileCardButton: () => {
    dispatch(ProfileActionCreators.goProfileCard());
  },
  goAllCitiesButton: () => {
    dispatch(ActivityActionCreators.goAllCities());
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  isGoProfileCard: state.profile.isGoProfileCard,
  isGoAllCities: state.activity.isGoAllCities,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityMain);
