// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Container, Text, CardItem } from 'native-base';
import { connect } from 'react-redux';
import type { MapStateToProps } from 'react-redux';
import type { StateType } from '../Redux/index';

type ActivityProfileCardInfoPropType = {
  activityProfileCardData: Array< mixed >
};

class ActivityProfileCardInfo extends Component<
  ActivityProfileCardInfoPropType,
> {
  render(): React$Element< * > {
    return (
      <CardItem>
        <FlatList
          data={this.props.activityProfileCardData}
          keyExtractor={(x: any, i: any): any => i}
          renderItem={({ item }: any): React$Element< * > => (
            <Container>
              <CardItem>
                <Text style={{ fontWeight: 'bold' }}> Email Adresi: </Text>
                <Text> {` ${item.user_e_mail}`} </Text>
              </CardItem>
              <CardItem>
                <Text style={{ fontWeight: 'bold' }}> Doğum Tarihi: </Text>
                <Text> {` ${item.user_birthday}`} </Text>
              </CardItem>
              <CardItem>
                <Text style={{ fontWeight: 'bold' }}> Profil Tipi: </Text>
                <Text> {` ${item.user_profile}`} </Text>
              </CardItem>
              <CardItem>
                <Text style={{ fontWeight: 'bold' }}> Telefon Numarasi: </Text>
                <Text> {` ${item.user_cellphone}`} </Text>
              </CardItem>
            </Container>
          )}
        />
      </CardItem>
    );
  }
}

const mapStateToProps = (state: StateType): MapStateToProps => ({
  isGoProfileCard: state.profile.isGoProfileCard,
  activityProfileCardData: state.activity.activityProfileCardData,
});

export default connect(mapStateToProps, null)(ActivityProfileCardInfo);
