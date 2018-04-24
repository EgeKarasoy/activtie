// @flow

import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Dimensions from 'Dimensions';
import logoImg from '../images/activtie.jpeg';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: DEVICE_WIDTH - 40,
    height: 80,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
    fontSize: 35,
  },
});

export default class Logo extends Component<*> {
  render(): React$Element< * > {
    return (
      <View style={styles.container}>
        <Image source={logoImg} style={styles.image} />
      </View>
    );
  }
}
