// @flow

import React, { Component } from 'react';
import { Container, Content, Text, Button, CardItem } from 'native-base';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import type { StateType } from '../../Redux/index';
import ProfileActionCreators from '../../Redux/ProfileRedux';

type ProfileCardInfoPropType = {
  goProfileCardCompletedFunc: Function
};

class ProfileCardInfo extends Component<ProfileCardInfoPropType> {
  render(): React$Element< * > {
    return (
      <Container>
        <Button
          full
          success
          small
          onPress={this.props.goProfileCardCompletedFunc}
        >
          <Text> Geri Dön</Text>
        </Button>
        <CardItem>
          <Text style={{ fontWeight: 'bold' }}> Doğum Tarihi: </Text>
          <Text> 16/01/1995 </Text>
        </CardItem>
        <CardItem>
          <Text style={{ fontWeight: 'bold' }}> Profil Tipi: </Text>
          <Text> Public </Text>
        </CardItem>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  goProfileCardCompletedFunc: () => {
    dispatch(ProfileActionCreators.goProfileCardCompleted());
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  isGoProfileCard: state.profile.isGoProfileCard,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCardInfo);
