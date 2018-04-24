// @flow

import { StyleSheet } from 'react-native';
import { Fonts, Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  applicationView: {
    padding: 80,
    justifyContent: 'center',
    backgroundColor: Colors.facebook,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.facebook,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    margin: Metrics.baseMargin,
  },
  myImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
