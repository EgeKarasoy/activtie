// @flow

import React from 'react';
import moment from 'moment';
import { Text, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import type { GateMonitorType } from '../Redux/GateMonitorRedux';
import styles from './Styles/RootContainerStyle';

export default class GateMonitor extends React.Component<GateMonitorType> {
  componentWillMount() {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
  }

  //  componentWillReceiveProps(newProps) {}
  // componentWillUnmount() {}

  // timeDifference = () => {
  //   const now = '04/09/2013 15:00:00';
  //   const then = '02/09/2013 14:20:30';

  //   const ms = Moment(now, 'DD/MM/YYYY HH:mm:ss').diff(Moment(then, 'DD/MM/YYYY HH:mm:ss'));
  //   const d = Moment.duration(ms);
  //   const s = d.format('hh:mm:ss');

  //   console.log(s);
  // };

  isAttempting: boolean;

  render(): React$Element< * > {
    const title = `  ${this.props.name}`;
    const blank = ' ';

    const now = new Date();
    const then = this.props.passingTime;
    const time = moment(moment(now, 'YYYY-MM-DDTHH:mm:ssZ').diff(moment(then, 'YYYY-MM-DDTHH:mm:ssZ'))).format('HH:mm:ss');
    // const emptyFunc = () => {};
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Text>{blank}</Text>
        <FontAwesome
          name="map-marker"
          size={25}
          style={{ color: 'black', backgroundColor: 'rgba(52, 52, 52, 0.1)' }}
        >
          <Text
            style={{
              width: 125,
              height: 35,
              fontWeight: 'bold',
              color: '#cc0000',
            }}
          >
            {title}, {time}
          </Text>
        </FontAwesome>
      </TouchableOpacity>
    );
  }
}
