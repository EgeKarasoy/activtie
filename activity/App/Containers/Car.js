// @flow

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './Styles/RootContainerStyle';

type CarPropsType = {
  name: string
};

export default class Car extends React.Component<CarPropsType> {
  componentWillMount() {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
  }

  //  componentWillReceiveProps(newProps) {}
  componentWillUnmount() {}

  isAttempting: boolean;

  render(): React$Element< * > {
    const title = `  ${this.props.name}`;

    // const emptyFunc = () => {};

    return (
      <TouchableOpacity>
        <Text />
        <FontAwesome
          name="car"
          size={25}
          style={
            (styles.icon,
            {
              textAlign: 'left',
              color: 'black',
              backgroundColor: 'rgba(52, 52, 52, 0.1)',
            })
          }
        >
          <Text
            style={{
              width: 100,
              height: 25,
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {title}
          </Text>
        </FontAwesome>
      </TouchableOpacity>
    );
  }
}
