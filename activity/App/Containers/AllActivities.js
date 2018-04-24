// @flow

import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
// import SearchBar from 'react-native-searchbar';
import { SearchBar } from 'react-native-elements';
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Thumbnail,
  Button,
  Icon,
} from 'native-base';
import ActivityHeader from './ActivityHeader';

const items = [
  1337,
  'halisaha1',
  'halisaha2',
  'basketbol',
  'yemek1',
  'yemek2',
  'yemek3',
  'doga yuruyusu',
  {
    lots: 'of',
    different: {
      types: 0,
      data: false,
      that: {
        can: {
          be: {
            quite: {
              complex: {
                hidden: ['gold!'],
              },
            },
          },
        },
      },
    },
  },
  [4, 2, 'tree'],
];

export default class AllActivities extends Component<*> {
  render(): React$Element< * > {
    return (
      <Container>
        <ActivityHeader />
        <SearchBar
          round
          allDataOnEmptySearch
          lightTheme
          onChangeText={null}
          showOnLoad
          hideBack
          cancelButtonTitle="İptal"
          autoCorrect={false}
          placeholder="Aktivite Ara.."
        />
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require('../Images/egekrsy.jpg')} />
                <Body>
                  <Text>Duman Bahar Konseri</Text>
                  <Text note style={{ fontStyle: 'italic' }}>
                    Beraber gidecegim arkadaş arıyorum
                  </Text>
                  <Text style={{ fontWeight: 'bold' }}>Ege Karasoy</Text>
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
        </Content>
      </Container>
    );
  }
}
