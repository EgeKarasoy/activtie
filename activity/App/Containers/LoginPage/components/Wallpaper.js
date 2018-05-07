// @flow

import React, { Component, PropTypes } from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import bgSrc from '../images/wallpaper.png';

// const DEVICE_WIDTH = Dimensions.get('window').width;
// const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});

export default class Wallpaper extends Component<*> {
  render(): React$Element< * > {
    return (
      <Image style={styles.picture} source={bgSrc}>
        {this.props.children}
      </Image>
    );
  }
}
