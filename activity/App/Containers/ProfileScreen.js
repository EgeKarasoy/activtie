// @flow

import React, { Component } from 'react';
import { Platform, Image } from 'react-native';
import { connect } from 'react-redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Right,
  Body,
  Left,
  Picker,
  Form,
  Item as FormItem,
} from 'native-base';
import ProfileActions from '../Redux/ProfileRedux';
import type { StateType } from '../Redux/';

type ProfileScrenPropType = {
  selected2: ?string,
  valueChange: Function,
  navigation: Function,
  value: Object
};

const { Item } = Picker;
class ProfileScreen extends Component<ProfileScrenPropType> {
  render(): ?React$Element< * > {
    return (
      <Container style={{ backgroundColor: '#4A96AD' }}>
        <Header style={{ backgroundColor: 'green' }}>
          <Left>
            <Button
              transparent
              onPress={(): void => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
              {this.props.value.name}
            </Title>
          </Body>
          <Right />
        </Header>
        <Image
          // source={{ uri: this.props.value.picture.data.url }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
          }}
        />
        <Content
          contentContainerStyle={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Form>
            <Picker
              mode="dropdown"
              placeholder="Araç Tipi Seçiniz"
              selectedValue={this.props.selected2}
              onValueChange={this.props.valueChange}
            >
              <Item label="Otomobil" value="key0" />
              <Item label="Minibüs-Otobüs" value="key1" />
              <Item label="Kamyonet" value="key2" />
              <Item label="Kamyon-Çekici" value="key3" />
              <Item label="Motosiklet" value="key4" />
            </Picker>
          </Form>
        </Content>
      </Container>
    );
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  valueChange: (selected2: ?string) => {
    dispatch(ProfileActions.valueChange(selected2));
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  selected2: state.profile.selected2,
  value: state.login.value,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
