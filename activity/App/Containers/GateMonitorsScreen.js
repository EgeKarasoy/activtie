// @flow

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
// import { FontAwesome } from '@expo/vector-icons';
import { Container, Content, Card, Body } from 'native-base';

import GateMonitor from './GateMonitor';
import GateMonitorPassed from './GateMonitorPassed';
import Car from './Car';
// import styles from './Styles/RootContainerStyle';
import GateMonitorActions from '../Redux/GateMonitorRedux';
import type { RoadType, PositionDataType } from '../Redux/GateMonitorRedux';
import type { StateType } from '../Redux/';
import Header from './GateMonitorHeader';
// import Wallpaper from './GateMonitorWallpaper';
import GeolocationExample from './Geolocation';

type GateMonitorPropType = {
  road: RoadType,
  updatePosition: Function
};

class GateMonitorsScreen extends Component<GateMonitorPropType> {
  componentDidMount() {
    // if redux persist is not active fire startup action
    // if (!ReduxPersist.active) {
    // this.props.startup();
    // }
  }

  getRows(): Array< React$Element< * > > {
    const { nodes } = this.props.road;
    const rows: Array< React$Element< * > > = [];
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node.type === 'gate' && node.orderNo < 2) {
        rows.push(<GateMonitorPassed
          key={i}
          monitorId={i.toString()}
          name={node.name}
          passingTime={this.props.road.passingTime}
        />);
      } else if (node.type === 'gate' && node.orderNo > 2) {
        rows.push(<GateMonitor
          key={i}
          monitorId={i.toString()}
          name={node.name}
          passingTime={this.props.road.passingTime}
        />);
      } else {
        rows.push(<Car key={i} name={node.name} />);
      }
    }
    return rows;
  }

  render(): React$Element< * > {
    return (
      // <View style={styles.container}>
      //   <StatusBar barStyle="light-content" />
      //   {/* <Text>Open up App.js to start working on your app!</Text> */}
      //   <FontAwesome name="car" size={50} style={styles.icon} color="white" />
      //   {this.getRows()}
      //   <Button title="CHANGE GATE MONITOR" onPress={this.props.buttonPress} />
      // </View>

      <Container style={{ backgroundColor: '#4A96AD' }}>
        <Header text={this.props.road.roadName} />
        <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
          <Card style={{ backgroundColor: '#4A96AD' }}>
            <Body>
              <TouchableOpacity>
                {this.getRows().reverse()}
                {/* <View style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                }}>
                    <Button
                      title="CHANGE GATE MONITOR"
                      onPress={this.props.buttonPress}
                    >
                      <Text>CHANGE GATE MONITOR</Text>
                    </Button>
                    <Button
                      title="CHANGE GATE MONITOR2"
                      onPress={this.props.buttonPress2}
                    >
                      <Text> CHANGE GATE MONITOR2</Text>
                    </Button>
                  </View> */}

                <GeolocationExample
                  latitude={this.props.road.position.latitude}
                  longitude={this.props.road.position.longitude}
                  positionCallBack={this.props.updatePosition}
                />
              </TouchableOpacity>
            </Body>
          </Card>
        </Content>
      </Container>
    );
  }
}

// RootContainer.propTypes = {
//   startup: PropTypes.func,
//   buttonPress: PropTypes.func,
// };

// RootContainer.defaultProps = {
//   startup: null,
//   buttonPress: null,
// };

const roadNew: RoadType = {
  roadName: 'EGE',
  passingTime: '2018-03-22T13:25:43.511Z',
  position: { latitude: 37.78, longitude: -122.4 },
  nodes: [
    {
      type: 'gate',
      orderNo: 1,
      name: 'Güzelbahçe',
      passingTime: '2018-03-13T18:25:43.511Z',
    },
    {
      type: 'gate',
      orderNo: 2,
      name: 'Urla',
      passingTime: null,
    },
    {
      type: 'vehicle',
      orderNo: 3,
      name: "Kayhan's car",
      passingTime: null,
    },
    {
      type: 'gate',
      orderNo: 4,
      name: 'Karaburun',
      passingTime: null,
    },
    {
      type: 'gate',
      orderNo: 5,
      name: 'Alacati',
      passingTime: null,
    },
    {
      type: 'gate',
      orderNo: 6,
      name: 'Cesme',
      passingTime: null,
    },
  ],
};
const roadNew2: RoadType = {
  roadName: 'EGE2',
  passingTime: '2018-03-22T13:25:43.511Z',
  position: { latitude: 37.78, longitude: -122.4 },
  nodes: [
    {
      type: 'gate',
      orderNo: 1,
      name: 'Güzelbahçe',
      passingTime: '2018-03-13T18:25:43.511Z',
    },
    {
      type: 'gate',
      orderNo: 2,
      name: 'Urla',
      passingTime: null,
    },
    {
      type: 'gate',
      orderNo: 3,
      name: 'Karaburun',
      passingTime: null,
    },
    {
      type: 'vehicle',
      orderNo: 4,
      name: "Kayhan's car",
      passingTime: null,
    },
    {
      type: 'gate',
      orderNo: 5,
      name: 'Alacati',
      passingTime: null,
    },
    {
      type: 'gate',
      orderNo: 6,
      name: 'Cesme',
      passingTime: null,
    },
  ],
};
// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  // startup: () => {
  //   dispatch(GateMonitorActions.setTime('1', 'KAYHAN'));
  //   dispatch(GateMonitorActions.setTime('2', 'KAYHAN2'));
  //   dispatch(GateMonitorActions.setTime('3', 'KAYHAN3'));
  // },
  updatePosition: (position: PositionDataType) => {
    dispatch(GateMonitorActions.updatePosition(position));
  },
  buttonPress: (): void => dispatch(GateMonitorActions.updateRoad(roadNew)),
  buttonPress2: (): void => dispatch(GateMonitorActions.updateRoad(roadNew2)),
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  road: state.gatemonitor.road,
});

export default connect(mapStateToProps, mapDispatchToProps)(GateMonitorsScreen);
