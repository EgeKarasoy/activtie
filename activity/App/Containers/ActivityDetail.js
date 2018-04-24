// @flow

import React, { Component } from 'react';
import { Text, Image } from 'react-native';
// import SearchBar from 'react-native-searchbar';
import { SearchBar } from 'react-native-elements';
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
} from 'native-base';
import type { StateType } from '../Redux/index';
import ProfileActionCreators from '../Redux/ProfileRedux';
import MyActivities from './Profile/MyActivities';

type ActivityDetailPropType = {
  goActivityCompletedFunc: Function
};

class ActivityDetail extends Component<ActivityDetailPropType> {
  render(): React$Element< * > {
    if (this.props.isGoActivity === false) return <MyActivities />;

    return (
      <Container>
        <Button full success small onPress={this.props.goActivityCompletedFunc}>
          <Text> Geri Dön</Text>
        </Button>
        <Card>
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
        </Card>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  goActivityCompletedFunc: () => {
    dispatch(ProfileActionCreators.goActivityCompleted());
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  isGoActivity: state.profile.isGoActivity,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetail);
