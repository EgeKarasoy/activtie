// @flow

import React from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';

import createStore from './App/Redux/index';
import applyConfigSettings from './App/Config/index';
import LoginScreen from './App/Containers/LoginScreen';

// Apply config overrides
applyConfigSettings();
// create our store
const store = createStore();

const config = {
  apiKey: 'AIzaSyB_iON7-yMQLcTJIU9MBP-U86Td0y6Ng-s',
  authDomain: 'cezapp-76f0b.firebaseapp.com',
  databaseURL: 'https://cezapp-76f0b.firebaseio.com',
  projectId: 'cezapp-76f0b',
  storageBucket: 'cezapp-76f0b.appspot.com',
  messagingSenderId: '446874486201',
};
const myFirebaseApp = firebase.initializeApp(config);

export const reduxSagaFirebase = new ReduxSagaFirebase(myFirebaseApp);

export default class App extends React.Component<*> {
  componentWillMount() {
    // Initialize Firebase
  }

  render(): React$Element< * > {
    return (
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    );
  }
}
