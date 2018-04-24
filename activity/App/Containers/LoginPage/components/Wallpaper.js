// @flow

import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import { StyleSheet, Image } from 'react-native';

import bgSrc from '../images/wallpaper.png';

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
