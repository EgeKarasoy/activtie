// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';

type GeolocationExamplePropType = {
  watchId?: number,
  latitude: ?number,
  longitude: ?number,
  positionCallBack: Function
};

class GeolocationExample extends Component<GeolocationExamplePropType> {
  componentDidMount() {
    this.props.watchId = navigator.geolocation.watchPosition(
      (position: Position) => {
        this.props.positionCallBack({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error: mixed) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 100,
      },
    );
  }

  componentWillUnmount() {
    if (this.props.watchId) {
      navigator.geolocation.clearWatch(this.props.watchId);
    }
  }

  render(): ?React$Element< * > {
    const { latitude, longitude } = this.props;

    return (
      <View
        style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text>Latitude: {latitude}</Text>
        <Text>Longitude: {longitude}</Text>
      </View>
    );
  }
}

export default GeolocationExample;
