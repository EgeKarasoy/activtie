// @flow

import React, { Component } from 'react';
import { Text } from 'react-native';
import { Content, Body } from 'native-base';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import type { StateType } from '../Redux/index';
import ActivityActionCreators from '../Redux/ActivityRedux';

class LoadingScreen extends Component<*> {
  render(): React$Element< * > {
    return (
      <Content
        containerContentStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Body>
          <Text style={{ fontWeight: 'bold' }}>Yukleniyor Lutfen Bekleyin</Text>
        </Body>
      </Content>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  isLoadingCompleted: () => {
    dispatch(ActivityActionCreators.loadingCompleted());
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  isLoading: state.activity.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
