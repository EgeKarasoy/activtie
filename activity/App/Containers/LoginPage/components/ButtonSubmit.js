// @flow

import React, { Component } from 'react';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Image,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import Expo from 'expo';
import firebase from 'firebase';
import type { StateType } from '../../../Redux/index';
import LoginActions from '../../../Redux/LoginRedux';
import spinner from '../images/loading.gif';
import RootContainer from '../../RootContainer';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -180,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  facebookButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b5998',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  googleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
});

type ButtonSubmitPropType = {
  user: ?string,
  // username: ?string,
  // password: ?string,
  buttonPress: Function,
  facebookPress: Function,
  googlePress: Function,
  value: ?string,
  valueChange: Function
  // facebookData: ?string
};

type ButtonSubmitStateType = {
  isLoading: boolean
  // json: any
};

export class ButtonSubmit extends Component<
  ButtonSubmitPropType,
  ButtonSubmitStateType,
> {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      // json: null,
    };

    //    this.buttonAnimated = new Animated.Value(0);
    //    this.growAnimated = new Animated.Value(0);
    // this._onPress = this._onPress.bind(this);
  }

  // _onPress() {
  //   if (this.state.isLoading) return;

  //   this.setState({ isLoading: true });
  //   // Animated.timing(this.buttonAnimated, {
  //   //   toValue: 1,
  //   //   duration: 200,
  //   //   easing: Easing.linear,
  //   // }).start();

  //   setTimeout(() => {
  //     this._onGrow();
  //   }, 2000);

  //   setTimeout(() => {
  //     Actions.secondScreen();
  //     this.setState({ isLoading: false });
  //     this.buttonAnimated.setValue(0);
  //     this.growAnimated.setValue(0);
  //   }, 2300);
  // }

  // _onGrow() {
  //   Animated.timing(this.growAnimated, {
  //     toValue: 1,
  //     duration: 200,
  //     easing: Easing.linear,
  //   }).start();
  // }
  // callGraph = async (token: any): Promise< void > => {
  //   // / Look at the fields... I don't have an `about` on my profile but everything else should get returned.
  //   const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`);
  //   console.log(response);
  //   const responseJSON = JSON.stringify(await response.json());
  //   this.setState({ responseJSON });
  // };
  loginWithFacebook = async (): Promise< void > => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '559657841057861',
      {
        permissions: ['public_profile'],
      },
    );
    if (type === 'success') {
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture?width=250&height=250`);
      console.log('RESPONSE : ', response);
      const json = await response.json();
      this.props.valueChange(json);
      console.log('USER_INFO : ', json);

      try {
        const credential = await firebase.auth.FacebookAuthProvider.credential(token);
        console.log('CREDENTIAL', credential);
        await firebase
          .auth()
          .signInWithCredential(credential)
          .then((user: User) => {
            const facebook = this.props.facebookPress;
            facebook();
          });
      } catch (error) {
        console.log.error(error);
      }
    }
  };

  loginWithGoogle = async (): Promise< void > => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '446874486201-bjfsdpk3d5sj0ugb3he4vpb30mdvr6pb.apps.googleusercontent.com',
        iosClientId: '446874486201-rhcsvvlmfgfepqvb9rhbdrtcbmriqlgb.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      console.log('RESULT: ', result);
      console.log('RESULT_ACCESS: ', result.accessToken);

      if (result.type === 'success') {
        try {
          const credential = await firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
          console.log('CREDENTIAL', credential);
          await firebase
            .auth()
            .signInWithCredential(credential)
            .then((user: User) => {
              const google = this.props.googlePress;
              google();
            });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // renderFacebook = (): ?React$Element< * > => { return (
  //     <View>
  //       <Text>{this.state.json.name}</Text>
  //     </View>
  //   );
  // };

  // Sign in with credential from the Facebook user.
  // firebaseLogin = (token: any) => {
  //   firebase
  //     .auth()
  //     .signInWithCredential(token)
  //     .catch((error: ?string) => {
  //       // Handle Errors here.
  //       console.warn('Giris Basarisiz', error);
  //     });
  // };

  render(): ?React$Element< * > {
    // const changeWidth = this.buttonAnimated.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    // });
    // const changeScale = this.growAnimated.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [1, MARGIN],
    // });
    if (this.props.user) return <RootContainer />;

    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            width: 150,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={this.props.buttonPress}
            activeOpacity={1}
          >
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>LOGIN</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.facebookButton}
            onPress={this.loginWithFacebook}
            activeOpacity={1}
          >
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>Login With Facebook</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={this.loginWithGoogle}
            activeOpacity={1}
          >
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>Login With Google</Text>
            )}
          </TouchableOpacity>
          {/* <Animated.View style={{ width: 5 }} /> */}
        </Animated.View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  buttonPress: (): void => dispatch(LoginActions.loginRequest()),
  facebookPress: () => {
    firebase.auth().onAuthStateChanged((user: Object) => {
      dispatch(LoginActions.loginSuccess(user));
    });
  },
  valueChange: (value: Object) => {
    dispatch(LoginActions.facebookLoginSuccess(value));
  },
  googlePress: () => {
    firebase.auth().onAuthStateChanged((user: Object) => {
      dispatch(LoginActions.loginSuccess(user));
    });
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  username: state.login.username,
  password: state.login.password,
  user: state.login.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonSubmit);
