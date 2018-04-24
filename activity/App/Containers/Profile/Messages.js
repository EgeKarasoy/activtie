// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from 'native-base';

export default class Messages extends Component<*> {
  render(): React$Element< * > {
    return (
      <Container>
        <Content>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail
                  source={{
                    uri:
                      'https://image.ibb.co/gEHBj7/Screen_Shot_2018_04_13_at_16_01_35.jpg',
                  }}
                />
              </Left>
              <Body>
                <Text>Kerim Kaya</Text>
                <Text note>Kanka aksam geliyon degil mi</Text>
              </Body>
              <Right>
                <Text note>15:43</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
