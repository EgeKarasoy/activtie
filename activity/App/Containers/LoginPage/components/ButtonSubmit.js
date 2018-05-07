// @flow

import React, { Component } from 'react';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Image,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import Expo from 'expo';
import firebase from 'firebase';
import type { StateType } from '../../../Redux/index';
import LoginActions from '../../../Redux/LoginRedux';
import spinner from '../images/loading.gif';
import RootActivity from '../../RootActivity';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -140,
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
  valueChange: Function,
  usernameError: ?string,
  usernameErrorChange: Function,
  passwordError: ?string,
  passwordErrorChange: Function,
  loginUsername: ?string,
  loginPassword: ?string,
  userIdChange: Function,
  loginSuccess: Function,
  username: ?string,
  usernameChange: Function,
  password: ?string,
  passwordChange: Function,
  name: ?string,
  nameChange: Function,
  surname: ?string,
  surnameChange: Function,
  loginUsernameChange: Function,
  loginUsername: ?string,
  loginPasswordChange: Function,
  loginPassword: ?string,
  pictureChange: Function
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

  onPressButton= () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.props.loginUsername) === false) {
      const usernameError2 = this.props.usernameErrorChange;
      usernameError2('Gecerli bir email girin..');
    }
    else if (this.props.loginPassword.length < 7) {
      const usernameError3 = this.props.usernameErrorChange;
      usernameError3('');
      const passwordError = this.props.passwordErrorChange;
      passwordError('Gecerli bir sifre girin, Minimum 6 Karakter');
    } 
    else {
      const passwordError2 = this.props.passwordErrorChange;
      passwordError2('');
      this.buttonPress();
    }
  };

  buttonPress= () => {
    fetch('http://activtie.com/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_e_mail: this.props.loginUsername,
        user_password: this.props.loginPassword,
      }),
    })
      .then((response: any): any => {
        console.log(response);
        return response.json();
      })
      .then((responseJson: any) => {
        const userKeeper = this.props.userIdChange;
        userKeeper(responseJson.user_id);
        const loginDone = this.props.loginSuccess;
        loginDone(responseJson.user_id);

        // dispatch(LoginActions.registerComplated());
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  loginWithFacebook = async (): Promise< void > => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '559657841057861',
      {
        permissions: ['public_profile'],
      },
    );
    if (type === 'success') {
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,first_name,last_name,email,about,picture.type(large)`);
      console.log('RESPONSE : ', response);
      const json = await response.json();
      this.props.valueChange(json);
      console.log('USER_INFO : ', json);

      const faceMail = `${json.id}@facebook.com`;
      console.log('FACE MAIL: ', faceMail);
      const postFaceEMail = this.props.usernameChange;
      postFaceEMail(faceMail);

      const faceName = json.first_name;
      console.log('FACE NAME: ', faceName);
      const postFaceName = this.props.nameChange;
      postFaceName(faceName);

      const faceLastName = json.last_name;
      console.log('FACE SURNAME: ', faceLastName);
      const postFaceSurname = this.props.surnameChange;
      postFaceSurname(faceLastName);

      const facePassword = json.id;
      console.log('FACE PASSWORD: ', facePassword);
      const postFacePassword = this.props.passwordChange;
      postFacePassword(facePassword);

      const facePicture = json.picture.data.url;
      console.log('FACE PICTURE: ', facePicture);
      const postFacePicture = this.props.pictureChange;
      postFacePicture(facePicture);


      try {
        const credential = await firebase.auth.FacebookAuthProvider.credential(token);
        console.log('CREDENTIAL', credential);
        await firebase
          .auth()
          .signInWithCredential(credential)
          .then((user: User) => {
            const facebook = this.postRegister;
            facebook();
          });
      } catch (error) {
        console.log.error(error);
      }
    }
  };

  postRegister= () => {
    fetch('http://activtie.com/api/registration', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: this.props.name,
        user_surname: this.props.surname,
        user_e_mail: this.props.username,
        user_password: this.props.password,
      }),
    })
      .then((response: any): any => {
        console.log(response);
        return response.json();
      })
      .then((responseJson: any) => {
        const faceLoginId = this.props.username;
        const postFaceId = this.props.loginUsernameChange;
        postFaceId(faceLoginId);
  
        const faceLoginPassword = this.props.password;
        const postFaceLoginPassword = this.props.loginPasswordChange;
        postFaceLoginPassword(faceLoginPassword);

        const logFacebook = this.buttonPress;
        logFacebook();
        // dispatch(LoginActions.registerComplated());
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  // loginWithGoogle = async (): Promise< void > => {
  //   try {
  //     const result = await Expo.Google.logInAsync({
  //       androidClientId: '446874486201-bjfsdpk3d5sj0ugb3he4vpb30mdvr6pb.apps.googleusercontent.com',
  //       iosClientId: '446874486201-rhcsvvlmfgfepqvb9rhbdrtcbmriqlgb.apps.googleusercontent.com',
  //       scopes: ['profile', 'email'],
  //     });
  //     console.log('RESULT: ', result);
  //     console.log('RESULT_ACCESS: ', result.accessToken);

  //     if (result.type === 'success') {
  //       try {
  //         const credential = await firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
  //         console.log('CREDENTIAL', credential);
  //         await firebase
  //           .auth()
  //           .signInWithCredential(credential)
  //           .then((user: User) => {
  //             const google = this.props.googlePress;
  //             google();
  //           });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
    // if (this.props.user === -1) {
    //   Alert.alert(
    //     'Oopps',
    //     'Kullanıcı Adı veya Şifre Yanlış !',
    //     [
    //       { text: 'Tamam', onPress: (): void => console.log('Tamama Basıldı') },
    //     ],
    //     { cancelable: false },
    //   )
    // }
    // if ((this.props.user !== -1) && (this.props.user !== null)) return <RootActivity />;

    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            width: 150,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={this.onPressButton}
            activeOpacity={1}
          >
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>GIRIS YAP</Text>
            )}
          </TouchableOpacity>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>{this.props.nameError}</Text>
          <TouchableOpacity
            style={styles.facebookButton}
            onPress={this.loginWithFacebook}
            activeOpacity={1}
          >
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>Facebook ile Gir</Text>
            )}
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.googleButton}
            onPress={this.loginWithGoogle}
            activeOpacity={1}
          >
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>Login With Google</Text>
            )}
          </TouchableOpacity> */}
          {/* <Animated.View style={{ width: 5 }} /> */}
        </Animated.View>
        <Text style={{ color: 'red', fontWeight: 'bold' }}>{this.props.usernameError}{this.props.passwordError}</Text>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  usernameErrorChange: (value: Object) => {
    dispatch(LoginActions.usernameErrorChange(value));
  },
  passwordErrorChange: (value: Object) => {
    dispatch(LoginActions.passwordErrorChange(value));
  },
  facebookPress: () => {
    firebase.auth().onAuthStateChanged((user: Object) => {
      dispatch(LoginActions.loginSuccess(user));
    });
  },
  valueChange: (value: Object) => {
    dispatch(LoginActions.facebookLoginSuccess(value));
  },
  userIdChange: (value: Object) => {
    dispatch(LoginActions.userIdChange(value));
  },
  loginSuccess: (user: Object) => {
    dispatch(LoginActions.loginSuccess(user));
  },
  nameChange: (name: ?string) => {
    console.log(name);
    dispatch(LoginActions.nameChange(name));
  },
  surnameChange: (surname: ?string) => {
    console.log(surname);
    dispatch(LoginActions.surnameChange(surname));
  },
  usernameChange: (text: ?string) => {
    console.log(text);
    dispatch(LoginActions.usernameChange(text));
  },
  passwordChange: (text: ?string) => {
    console.log(text);
    dispatch(LoginActions.passwordChange(text));
  },
  loginUsernameChange: (text: ?string) => {
    console.log(text);
    dispatch(LoginActions.loginUsernameChange(text));
  },
  loginPasswordChange: (text: ?string) => {
    console.log(text);
    dispatch(LoginActions.loginPasswordChange(text));
  },
  pictureChange: (text: ?string) => {
    console.log(text);
    dispatch(LoginActions.pictureChange(text));
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  loginUsername: state.login.loginUsername,
  loginPassword: state.login.loginPassword,
  user: state.login.user,
  usernameError: state.login.usernameError,
  passwordError: state.login.passwordError,
  nameError: state.login.nameError,
  userId: state.login.userId,
  username: state.login.username,
  password: state.login.password,
  name: state.login.name,
  surname: state.login.surname,
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonSubmit);
