// @flow

import React, { Component } from 'react';
import { Text, Image, Alert } from 'react-native';
import {
  ActionsContainer,
  Button,
  FieldsContainer,
  Fieldset,
  Form,
  FormGroup,
  Input,
  Label,
} from 'react-native-clean-form';
import { Picker, Icon } from 'native-base';
import DatePicker from 'react-native-datepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import type { StateType } from '../Redux/index';
import ActivityActionCreators from '../Redux/ActivityRedux';
// import TimePicker from 'react-native-timepicker';
// import { Text } from 'react-native';
// import { Content } from 'native-base';
import ActivityHeader from './ActivityHeader';
import ActivityMain from './ActivityMain';

type ActivityCreatePropType = {
  activityCreateName: ?string,
  activityCreateNameChange: Function,
  activityCreateDescription: ?string,
  activityCreateDescriptionChange: Function,
  activityCreateUserNumber: ?number,
  activityCreateUserNumberChange: Function,
  activityCreateDate: ?string,
  activityCreateDateChange: Function,
  // createActivityButton: Function,
  activityCreateTime: ?string,
  activityCreateTimeChange: Function,
  activityCreateCategoryPickerValue: ?string,
  activityCreateCategoryPickerValueChange: Function,
  activityCreateCityNameChange: Function,
  activityCreateCityName: ?string,
  getCityData: Function,
  cityData: Array< mixed >,
  getCategoryData: Function,
  categoryData: Array< mixed >,
  activityCreateLatitudeSender: Function,
  activityCreateLongitudeSender: Function,
  activityCreateLatitude: ?string,
  activityCreateLongitude: ?string,
  userId: ?string,
  goActivityMainCheck: Function,
  goActivityMain: boolean,
  activityCreateErrorChange: Function,
  activityCreateError: ?string
};

class ActivityCreate extends Component<ActivityCreatePropType> {
  componentDidMount() {
    const cities = this.getActivityCities
    cities();
    const categories = this.getActivityCategories
    categories();
    // console.disableYellowBox = true;
  }

  onPressButtonCreate= () => {
    if (this.props.activityCreateName.length < 4) {
      const error1 = this.props.activityCreateErrorChange;
      error1('Aktivite adinizi en az 3 karakter girin..');
    }
    else if (this.props.activityCreateDescription.length < 4) {
      const error2 = this.props.activityCreateErrorChange;
      error2('');
      const error3 = this.props.activityCreateErrorChange;
      error3('Aktivite aciklamanizi en az 3 karakter girin..');
    } 
    else if (this.props.activityCreateCategoryPickerValue.length < 1) {
      const error4 = this.props.activityCreateErrorChange;
      error4('');
      const error5 = this.props.activityCreateErrorChange;
      error5('Aktivite kategorinizi secin..');
    } 
    else if (this.props.activityCreateUserNumber.length < 1) {
      const error6 = this.props.activityCreateErrorChange;
      error6('');
      const error7 = this.props.activityCreateErrorChange;
      error7('Kisi sayisi girin..');
    } 
    else if (this.props.activityCreateCityName.length < 1) {
      const error8 = this.props.activityCreateErrorChange;
      error8('');
      const error9 = this.props.activityCreateErrorChange;
      error9('Aktivite sehrinizi secin..');
    }
    else if (this.props.activityCreateDate.length < 1) {
      const error10 = this.props.activityCreateErrorChange;
      error10('');
      const error11 = this.props.activityCreateErrorChange;
      error11('Aktivite tarihinizi secin..');
    } 
    else if (this.props.activityCreateTime.length < 1) {
      const error12 = this.props.activityCreateErrorChange;
      error12('');
      const error13 = this.props.activityCreateErrorChange;
      error13('Aktivite saatinizi secin..');
    } 
    else if ((this.props.activityCreateLatitude.length < 1) && (this.props.activityCreateLongitude.length < 1)) {
      const error14 = this.props.activityCreateErrorChange;
      error14('');
      const error15 = this.props.activityCreateErrorChange;
      error15('Aktivite konumunuzu belirleyin..');
    } 
    else {
      const errorReset = this.props.activityCreateErrorChange;
      errorReset('');
      this.postActivityCreate();
    }
  };

  getActivityCities = (): void =>
    fetch('http://activtie.com/api/all_cities', { method: 'GET' })
      .then((response: any): any => response.json())
      .then((responseJson: any) => {
        const citySend = this.props.getCityData;
        citySend(responseJson);
      })
      .catch((error: any) => {
        console.error(error);
      });

  getActivityCategories = (): void =>
    fetch('http://activtie.com/api/all_categories', { method: 'GET' })
      .then((response: any): any => response.json())
      .then((responseJson: any) => {
        const categorySend = this.props.getCategoryData;
        categorySend(responseJson);
      })
      .catch((error: any) => {
        console.error(error);
      });

  postActivityCreate= () => {
    fetch('http://activtie.com/api/create_activity', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activity_name: this.props.activityCreateName,
        activity_time: `${this.props.activityCreateDate} ${this.props.activityCreateTime}`,
        activity_location: `${this.props.activityCreateLatitude}-${this.props.activityCreateLongitude}`,
        activity_user_number: this.props.activityCreateUserNumber,
        activity_info: this.props.activityCreateDescription,
        city_name: this.props.activityCreateCityName,
        category_name: this.props.activityCreateCategoryPickerValue,
        activity_picture: null,
        creator_id: this.props.userId,
      }),
    })
      .then((response: any): any => {
        console.log(response);
        return response.json();
      })
      .then((responseJson: any) => {
        console.log(responseJson[0].result);
        if (responseJson[0].result === 'true') {
          Alert.alert(
            'SUPERRR',
            'Aktivite Kaydi Basarili!',
            [
              {
                text: 'Tamam',
                onPress: (): void => console.log('Tamama Basıldı'),
              },
            ],
            { cancelable: false },
          );
          const goMain = this.props.goActivityMainCheck;
          goMain();
        } else {
          Alert.alert(
            'Oopps',
            'Aktiviteni Kaydedemedik, Tekrar Dene !',
            [
              {
                text: 'Tamam',
                onPress: (): void => console.log('Tamama Basıldı'),
              },
            ],
            { cancelable: false },
          );
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  render(): React$Element< * > {
    if (this.props.goActivityMain === true) return <ActivityMain />;
    return (
      <Form>
        <ActivityHeader />
        <FieldsContainer>
          <Fieldset label="Aktivite Detaylari">
            <FormGroup>
              <Label> Aktivite İsmin Nedir ?</Label>
              <Input
                placeholder="Doga Yuruyusu"
                autoCorrect={false}
                onChangeText={this.props.activityCreateNameChange}
                value={this.props.activityCreateName}
                maxLength={255}
              />
            </FormGroup>
            <FormGroup>
              <Label> Aktivitene Açıklama Yaz..</Label>
              <Input
                placeholder="Baharda guzel bir yuruyus"
                autoCorrect={false}
                onChangeText={this.props.activityCreateDescriptionChange}
                value={this.props.activityCreateDescription}
                maxLength={1027}
              />
            </FormGroup>
            <FormGroup>
              <Label> Kategorini Seç</Label>
              <Picker
                name="categories"
                mode="dropdown"
                placeHolder="Spor"
                placeholderStyle={{ color: 'black' }}
                iosHeader="Spor"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                onValueChange={this.props.activityCreateCategoryPickerValueChange}
                selectedValue={this.props.activityCreateCategoryPickerValue}
              >
                { this.props.categoryData.map((item: any, key: any): any => (
                  <Picker.Item label={item.category_name} value={item.category_name} key={key} />))}
              </Picker>
            </FormGroup>
            <FormGroup>
              <Label> Kişi Sayısı</Label>
              <Input
                placeholder="5"
                autoCorrect={false}
                onChangeText={this.props.activityCreateUserNumberChange}
                value={this.props.activityCreateUserNumber}
                maxLength={2}
              />
            </FormGroup>
          </Fieldset>
          <Fieldset label="Ne Zaman, Nerede?" last>
            <FormGroup>
              <Label> Şehrin Nedir?</Label>
              <Picker
                name="cities"
                mode="dropdown"
                placeHolder="Izmir"
                placeholderStyle={{ color: 'black' }}
                iosHeader="Izmir"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                onValueChange={this.props.activityCreateCityNameChange}
                selectedValue={this.props.activityCreateCityName}
              >
                { this.props.cityData.map((item: any, key: any): any => (
                  <Picker.Item label={item.city_name} value={item.city_name} key={key} />))}
              </Picker>
            </FormGroup>
            <FormGroup>
              <Label> Tarih Sec </Label>
              <DatePicker
                style={{ width: 200 }}
                date={this.props.activityCreateDate}
                mode="date"
                placeholder="Tarih sec"
                format="YYYY-MM-DD"
                minDate="2018-05-07"
                maxDate="2018-12-31"
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
                onDateChange={this.props.activityCreateDateChange}
              />
            </FormGroup>
            <FormGroup>
              <Label> Saat Sec </Label>
              <DatePicker
                style={{ width: 200 }}
                date={this.props.activityCreateTime}
                mode="time"
                placeholder="Saat sec"
                format="HH:mm:ss"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                is24Hour
                minuteInterval={10}
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
                onDateChange={this.props.activityCreateTimeChange}
              />
            </FormGroup>
          </Fieldset>
          <Fieldset label="Aktivite Lokasyonunu Belirle">
            <GooglePlacesAutocomplete
              placeholder="Search"
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType="search" // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              listViewDisplayed="auto" // true/false/undefined
              fetchDetails
              renderDescription={(row: any): any => row.description} // custom description render
              onPress={(data: any, details: any = null) => { // 'details' is provided when fetchDetails = true
                const latitude = details.geometry.location.lat;
                console.log('latitude: ', latitude);
                const latPoster = this.props.activityCreateLatitudeSender;
                latPoster(latitude);

                const longitude = details.geometry.location.lng;
                console.log('longitude: ', longitude);
                const longPoster = this.props.activityCreateLongitudeSender;
                longPoster(longitude);
              }}

              getDefaultValue={(): void => ''}

              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyDteyUM39sECv9LqZKuTa9OlBfxgO1-0Jo',
                language: 'tr', // language of the results
                // types: '(cities)', // default: 'geocode'
              }}

              styles={{
                textInputContainer: {
                  width: '100%',
                },
                description: {
                  fontWeight: 'bold',
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}

              // currentLocation // Will add a 'Current location' button at the top of the predefined places list
              // currentLocationLabel="Current location"
              nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              GoogleReverseGeocodingQuery={{
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }}
              GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: 'distance',
                types: 'food',
              }}

              // filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

              debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
              // renderLeftButton={(): any  => <Icon name="arrow-back" />}
              // renderRightButton={(): any => <Text>Custom text after the input</Text>}
            />
          </Fieldset>
        </FieldsContainer>
        <ActionsContainer>
          <Button
            icon="md-checkmark"
            iconPlacement="right"
            onPress={this.onPressButtonCreate}
          >
            Aktiviteni Yarat
          </Button>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>{this.props.activityCreateError}</Text>
        </ActionsContainer>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  activityCreateNameChange: (value: ?Object) => {
    console.log(value);
    dispatch(ActivityActionCreators.activityCreateNameChange(value));
  },
  activityCreateDescriptionChange: (value: ?Object) => {
    console.log(value);
    dispatch(ActivityActionCreators.activityCreateDescriptionChange(value));
  },
  activityCreateCategoryPickerValueChange: (value: ?Object) => {
    console.log(value);
    dispatch(ActivityActionCreators.activityCreateCategoryPickerValueChange(value));
  },
  activityCreateUserNumberChange: (value: ?Object) => {
    console.log(value);
    dispatch(ActivityActionCreators.activityCreateUserNumberChange(value));
  },
  activityCreateCityNameChange: (value: ?Object) => {
    console.log(value);
    dispatch(ActivityActionCreators.activityCreateCityNameChange(value));
  },
  activityCreateDateChange: (value: ?Object) => {
    console.log(value);
    dispatch(ActivityActionCreators.activityCreateDateChange(value));
  },
  activityCreateTimeChange: (value: ?Object) => {
    console.log(value);
    dispatch(ActivityActionCreators.activityCreateTimeChange(value));
  },
  getCityData: (value: ?Object) => {
    console.log(value);
    dispatch(ActivityActionCreators.getCityData(value));
  },
  getCategoryData: (value: ?Object) => {
    console.log(value);
    dispatch(ActivityActionCreators.getCategoryData(value));
  },
  activityCreateLatitudeSender: (value: ?Object) => {
    console.log(value);
    dispatch(ActivityActionCreators.activityCreateLatitudeSender(value));
  },
  activityCreateLongitudeSender: (value: ?Object) => {
    console.log(value);
    dispatch(ActivityActionCreators.activityCreateLongitudeSender(value));
  },
  goActivityMainCheck: () => {
    dispatch(ActivityActionCreators.goActivityMainCheck());
  },
  activityCreateErrorChange: (value: ?Object) => {
    console.log(value);
    dispatch(ActivityActionCreators.activityCreateErrorChange(value));
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  activityCreateName: state.activity.activityCreateName,
  activityCreateDescription: state.activity.activityCreateDescription,
  activityCreateCategoryPickerValue: state.activity.activityCreateCategoryPickerValue,
  activityCreateUserNumber: state.activity.activityCreateUserNumber,
  activityCreateCityName: state.activity.activityCreateCityName,
  activityCreateDate: state.activity.activityCreateDate,
  activityCreateTime: state.activity.activityCreateTime,
  cityData: state.activity.cityData,
  categoryData: state.activity.categoryData,
  activityCreateLatitude: state.activity.activityCreateLatitude,
  activityCreateLongitude: state.activity.activityCreateLongitude,
  userId: state.login.userId,
  goActivityMain: state.activity.goActivityMain,
  activityCreateError: state.activity.activityCreateError,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityCreate);
