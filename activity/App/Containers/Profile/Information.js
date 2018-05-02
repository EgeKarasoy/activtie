// @flow

import React, { Component } from 'react';
import { Alert } from 'react-native';
import {
  Container,
  Content,
  Text,
  Textarea,
  Form,
  Item,
  Input,
  Picker,
  Icon,
  Button,
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import type { StateType } from '../../Redux/index';
import ProfileActionCreators from '../../Redux/ProfileRedux';
import Profile from './Profile';

type InformationType = {
  userId: ?string,
  informationDate: ?string,
  informationDateChange: Function,
  informationName: ?string,
  informationNameChange: Function,
  informationSurname: ?string,
  informationSurnameChange: Function,
  informationInfo: ?string,
  informationInfoChange: Function,
  informationEmail: ?string,
  informationEmailChange: Function,
  informationPhone: ?string,
  informationPhoneChange: Function,
  informationDate: ?string,
  informationDateChange: Function,
  informationError: ?string,
  informationErrorChange: Function,
  updateProfileChange: Function,
  goUpdateProfile: ?string
};

class Information extends Component<InformationType> {
  onPressButton= () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const reg2 = /^(?=.*[0-9])[- +()0-9]+$/;
    if (this.props.informationName.length < 3) {
      const nameError = this.props.informationErrorChange;
      nameError('Adinizi Tam Girin..');
    }
    else if (this.props.informationSurname.length < 3) {
      const nameError = this.props.informationErrorChange;
      nameError('');
      const surnameError = this.props.informationErrorChange;
      surnameError('Soyadinizi Tam Girin..');
    }
    else if (this.props.informationInfo.length < 3) {
      const surnameError = this.props.informationErrorChange;
      surnameError('');
      const infoError = this.props.informationErrorChange;
      infoError('Aciklamanizi Tam Girin..');
    }
    else if (reg.test(this.props.informationEmail) === false) {
      const infoError = this.props.informationErrorChange;
      infoError('');
      const emailError = this.props.informationErrorChange;
      emailError('Gecerli bir email girin..');
    }
    else if (this.props.informationPhone.length < 11) {
      const infoError = this.props.informationErrorChange;
      infoError('');
      const phoneError = this.props.informationErrorChange;
      phoneError('Gecerli bir telefon girin..');
    }
    // else if (this.props.informationDate.length < 1) {
    //   const phoneError = this.props.informationErrorChange;
    //   phoneError('');
    //   const dateError = this.props.informationErrorChange;
    //   dateError('Gecerli bir tarih girin..');
    // } 
    else {
      const nullError = this.props.informationErrorChange;
      nullError('');
      this.buttonPress();
    }
  };

  buttonPress= () => {
    fetch('http://activtie.com/api/update_profile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.props.userId,
        user_name: this.props.informationName,
        user_surname: this.props.informationSurname,
        user_cellphone: this.props.informationPhone,
        user_e_mail: this.props.informationEmail,
        user_birthday: this.props.informationDate,
        user_info: this.props.informationInfo,
        user_picture: null,
        user_privacy: 'public',
        user_facebook: null,
        user_instagram: null,
        user_twitter: null,
      }),
    })
      .then((response: any): any => {
        console.log(response);
        return response.json();
      })
      .then((responseJson: any) => {
        Alert.alert(
          'SUPERRR',
          'Bilgilerini Guncelledik!',
          [
            {
              text: 'Tamam',
              onPress: (): void => console.log('Tamama Basıldı'),
            },
          ],
          { cancelable: false },
        );
        const goProfile = this.props.updateProfileChange;
        goProfile();
        // dispatch(LoginActions.registerComplated());
      })
      .catch(() => {
        console.log('catchteyim ben');
      });
  };
  render(): React$Element< * > {
    if (this.props.goUpdateProfile === true) return <Profile />;
    return (
      <Container>
        <Content padder>
          <Text style={{ fontWeight: 'bold' }}> Ad-Soyad</Text>
          <Item regular>
            <Input
              placeholder="Ad"
              autoCorrect={false}
              onChangeText={this.props.informationNameChange}
              value={this.props.informationName}
            />
          </Item>
          <Item regular>
            <Input
              placeholder="Soyad"
              autoCorrect={false}
              onChangeText={this.props.informationSurnameChange}
              value={this.props.informationSurname}
            />
          </Item>
          <Text style={{ fontWeight: 'bold' }}> Açıklamanı Değiştir</Text>
          <Form>
            <Textarea
              rowSpan={3}
              bordered
              autoCorrect={false}
              placeholder="Futbolu severim.."
              onChangeText={this.props.informationInfoChange}
              value={this.props.informationInfo}
            />
          </Form>
          <Text style={{ fontWeight: 'bold' }}> E-mail Adresin</Text>
          <Item regular>
            <Input
              placeholder="activtie@gmail.com"
              autoCorrect={false}
              onChangeText={this.props.informationEmailChange}
              value={this.props.informationEmail}
            />
          </Item>
          <Text style={{ fontWeight: 'bold' }}> Telefon</Text>
          <Item regular>
            <Input
              placeholder="0555 123 45 56"
              autoCorrect={false}
              onChangeText={this.props.informationPhoneChange}
              value={this.props.informationPhone}
            />
          </Item>
          <Form>
            <Text style={{ fontWeight: 'bold' }}> Doğum Tarihin</Text>
            <DatePicker
              style={{ width: 200 }}
              date={this.props.informationDate}
              mode="date"
              placeholder="Tarih sec"
              format="YYYY-MM-DD"
              minDate="1920-05-07"
              maxDate="2017-12-31"
              confirmBtnText="Onayla"
              cancelBtnText="Iptal Et"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={this.props.informationDateChange}
            />
          </Form>
          <Button full warning onPress={this.onPressButton}>
            <Text>KAYDET</Text>
          </Button>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>{this.props.informationError}</Text>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  informationNameChange: (value: Object) => {
    dispatch(ProfileActionCreators.informationNameChange(value));
  },
  informationSurnameChange: (value: Object) => {
    dispatch(ProfileActionCreators.informationSurnameChange(value));
  },
  informationInfoChange: (value: Object) => {
    dispatch(ProfileActionCreators.informationInfoChange(value));
  },
  informationEmailChange: (value: Object) => {
    dispatch(ProfileActionCreators.informationEmailChange(value));
  },
  informationPhoneChange: (value: Object) => {
    dispatch(ProfileActionCreators.informationPhoneChange(value));
  },
  informationDateChange: (value: Object) => {
    dispatch(ProfileActionCreators.informationDateChange(value));
  },
  informationErrorChange: (value: Object) => {
    dispatch(ProfileActionCreators.informationErrorChange(value));
  },
  messagesAvaibleCheckCompleted: () => {
    dispatch(ProfileActionCreators.messagesAvaibleCheckCompleted());
  },
  messagesAvaibleCheck: () => {
    dispatch(ProfileActionCreators.messagesAvaibleCheck());
  },
  updateProfileChange: () => {
    dispatch(ProfileActionCreators.updateProfileChange());
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  profileMessagesData: state.profile.profileMessagesData,
  userId: state.login.userId,
  isMessagesAvaible: state.profile.isMessagesAvaible,
  informationName: state.profile.informationName,
  informationSurname: state.profile.informationSurname,
  informationInfo: state.profile.informationInfo,
  informationEmail: state.profile.informationEmail,
  informationPhone: state.profile.informationPhone,
  informationDate: state.profile.informationDate,
  informationError: state.profile.informationError,
  goUpdateProfile: state.profile.goUpdateProfile,
});

export default connect(mapStateToProps, mapDispatchToProps)(Information);
