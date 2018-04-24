// @flow

import React, { Component } from 'react';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
  Icon,
} from 'native-base';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import type { StateType } from '../../Redux/index';
import ProfileActionCreators from '../../Redux/ProfileRedux';
import ActivityDetail from '../ActivityDetail';
import IndexCard from '../Profile/IndexCard';

type MyActivitiesPropType = {
  goActivityButton: Function,
  goProfileCardButton: Function
};

class MyActivities extends Component<MyActivitiesPropType> {
  render(): React$Element< * > {
    if (this.props.isGoActivity) return <ActivityDetail />;
    if (this.props.isGoProfileCard) return <IndexCard />;

    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>Duman Konseri</Text>
            </CardItem>
            <CardItem>
              <Icon name="clock" />
              <Text>Saat: 19:00</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Button full warning onPress={this.props.goActivityButton}>
                  <Text>Aktivitene Git</Text>
                </Button>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>Aktivite Sahibi: </Text>
              <Button transparent dark onPress={this.props.goProfileCardButton}>
                <Text>Ege Karasoy</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  goActivityButton: () => {
    dispatch(ProfileActionCreators.goActivity());
  },
  goProfileCardButton: () => {
    dispatch(ProfileActionCreators.goProfileCard());
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  isGoActivity: state.profile.isGoActivity,
  isGoProfileCard: state.profile.isGoProfileCard,
});

export default connect(mapStateToProps, mapDispatchToProps)(MyActivities);
