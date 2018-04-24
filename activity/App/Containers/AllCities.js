// @flow

import React, { Component } from 'react';
import { Text, View, Image, FlatList, StyleSheet } from 'react-native';
// import SearchBar from 'react-native-searchbar';
import { SearchBar } from 'react-native-elements';
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Thumbnail,
  Button,
  Icon,
  Header,
  Item,
} from 'native-base';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import type { StateType } from '../Redux/index';
import ActivityActionCreators from '../Redux/ActivityRedux';
import ActivityMain from './ActivityMain';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type AllCitiesPropType = {
  goAllCitiesCompletedButton: Function
};

class AllCities extends Component<AllCitiesPropType> {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getData();
    // console.disableYellowBox = true;
  }

  getData(): void {
    return fetch('https://univerlist.com/api/v1/province/', { method: 'GET' })
      .then((response: any): any => response.json())
      .then((responseJson: any) => {
        this.setState({ data: responseJson.results });
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  //   postData() {
  //     return fetch('http://localhost:1923/api/cities', {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           name: 'yourValue',
  //           country: 'yourOtherValue',
  //         }),

  //       });
  // }

  render(): React$Element< * > {
    if (this.props.isGoAllCities === false) return <ActivityMain />;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.props.goAllCitiesCompletedButton}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
        </Header>
        <Content contentContainerStyle={styles.container}>
          <FlatList
            numColumns={3}
            data={this.state.data}
            keyExtractor={(x: any, i: any): any => i}
            renderItem={({ item }: any): React$Element< * > => (
              <Item
                style={{
                  justifyContent: 'space-around',
                }}
              >
                <Image
                  source={{ uri: `${item.thumbnail}` }}
                  style={{ height: 150, width: 100 }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button small full dark>
                      <Text style={{ color: 'white' }}>{`${item.name}`}</Text>
                    </Button>
                  </View>
                </Image>
              </Item>
            )}
          />
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  goAllCitiesCompletedButton: () => {
    dispatch(ActivityActionCreators.goAllCitiesCompleted());
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  isGoAllCities: state.activity.isGoAllCities,
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCities);
