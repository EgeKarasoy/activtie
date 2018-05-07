// @flow

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Image,
  FlatList,
} from 'react-native';
import {
  Content,
  Button,
  Left,
  CardItem,
  Icon,
  Card,
  Header,
} from 'native-base';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import type { StateType } from '../Redux/index';
// import ProfileActionCreators from '../Redux/ProfileRedux';
import ActivityActionCreators from '../Redux/ActivityRedux';
// import ActivityHeader from './ActivityHeader';
import ActivityJoin from './ActivityJoin';
import ActivitySearch from './ActivitySearch';

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'ios' ? 64 : 44,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 30 : 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  sectionStyles: {
    marginTop: 20,
  },
  title: {
    marginLeft: 8,
    marginBottom: 2,
    color: 'white',
  },
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

type ActivitySearchDetailPropType = {
  searchData: Array< mixed >,
  goActivitySearchDetailCheckCompleted: Function,
  goActivityJoinButton: Function
};

class ActivitySearchDetail extends Component<ActivitySearchDetailPropType> {
  render(): React$Element< * > {
    if (this.props.isGoActivityJoin === true) return <ActivityJoin />;
    if (this.props.goActivitySearchDetail === false) { return <ActivitySearch />; }
    if (this.props.searchData === null) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold', color: 'black' }}>
            Arama Sonucu bulunamadi..
          </Text>
        </View>
      );
    }
    return (
      <Content>
        <Header>
          <Left>
            <Button
              transparent
              onPress={this.props.goActivitySearchDetailCheckCompleted}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
        </Header>
        <View>
          <Text style={{ fontWeight: 'bold' }}> Arama Sonuclari: </Text>
          <CardItem>
            <FlatList
              // numColumns={3}
              data={this.props.searchData}
              keyExtractor={(x: any, i: any): any => i}
              renderItem={({ item }: any): React$Element< * > => (
                <Card>
                  <CardItem cardBody>
                    <Image
                      source={{
                        uri: `http://activtie.com/${item.activity_picture}`,
                      }}
                      style={{ height: 200, width: null, flex: 1 }}
                    />
                  </CardItem>
                  <Button
                    full
                    warning
                    onPress={(): void =>
                      this.props.goActivityJoinButton(item.activity_id)
                    }
                  >
                    <Text> INCELE ! </Text>
                  </Button>
                  <CardItem>
                    <Left>
                      <Text>
                        <Icon active name="pin" />{' '}
                        {`${item.activity_city}            `}
                        <Text>
                          <Icon active name="people" />{' '}
                          {`${item.activity_user_number}            `}
                        </Text>
                      </Text>
                    </Left>
                  </CardItem>
                </Card>
              )}
            />
          </CardItem>
        </View>
      </Content>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  goActivitySearchDetailCheckCompleted: () => {
    dispatch(ActivityActionCreators.goActivitySearchDetailCheckCompleted());
  },
  goActivityJoinButton: (value: Object) => {
    dispatch(ActivityActionCreators.goActivityJoin(value));
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  isGoActivityJoin: state.activity.isGoActivityJoin,
  goActivitySearchDetail: state.activity.goActivitySearchDetail,
  searchData: state.activity.searchData,
  activityId: state.activity.activityId,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivitySearchDetail);
