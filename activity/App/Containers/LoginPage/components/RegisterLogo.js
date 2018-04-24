// @flow

import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
    fontSize: 25,
  },
});

export default class RegisterLogo extends Component<*> {
  render(): React$Element< * > {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>CREATE ACCOUNT</Text>
      </View>
    );
  }
}
