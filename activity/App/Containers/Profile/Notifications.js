// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Body,
  Button,
  Icon,
} from 'native-base';

export default class Notifications extends Component<*> {
  render(): React$Element< * > {
    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <Thumbnail
                square
                size={80}
                source={{
                  uri:
                    'https://image.ibb.co/gEHBj7/Screen_Shot_2018_04_13_at_16_01_35.jpg',
                }}
              />
              <Body>
                <Text>Mahmut Tuncer</Text>
                <Text note>Aktivitene katilmak istiyor...</Text>
              </Body>
              <Button success>
                <Icon name="checkmark-circle" />
              </Button>
              <Button danger>
                <Icon name="close-circle" />
              </Button>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
