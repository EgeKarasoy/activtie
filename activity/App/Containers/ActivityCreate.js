// @flow

import React, { Component } from 'react';
import { Text, Image } from 'react-native';
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

const cityOptions = [
  { label: 'Izmir', value: 'Izmir' },
  { label: 'Istanbul', value: 'Istanbul' },
  { label: 'Ankara', value: 'Ankara' },
];

const categoryOptions = [
  { label: 'Spor', value: 'Spor' },
  { label: 'Yeme-İçme', value: 'Yemek' },
  { label: 'Gezi', value: 'Gezi' },
  { label: 'Alışveriş', value: 'Alisveris' },
  { label: 'Organizasyon', value: 'Organizasyon' },
  { label: 'Seyahat', value: 'Seyahat' },
];

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#D9D9D9',
//   },

//   picker: {
//     backgroundColor: '#E5E5E5',
//   },
// });

type ActivityCreatePropType = {
  activityCreateName: ?string,
  activityCreateNameChange: Function,
  activityCreateDescription: ?string,
  activityCreateDescriptionChange: Function,
  activityCreateUserNumber: ?number,
  activityCreateUserNumberChange: Function,
  activityCreateDate: ?string,
  activityCreateDateChange: Function,
  createActivityButton: Function,
  activityCreateTime: ?string,
  activityCreateTimeChange: Function,
  activityCreateCategoryPickerValue: ?string,
  activityCreateCategoryPickerValueChange: Function,
  activityCreateCityNameChange: Function,
  activityCreateCityName: ?string,
  getCityData: Function,
  cityData: Array< mixed >,
  getCategoryData: Function,
  categoryData: Array< mixed >
};

class ActivityCreate extends Component<ActivityCreatePropType> {
  componentDidMount() {
    const cities = this.getActivityCities
    cities();
    const categories = this.getActivityCategories
    categories();
    // console.disableYellowBox = true;
  }

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

  render(): React$Element< * > {
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
                format="HH:mm"
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
                console.log(data, details);
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
            onPress={this.props.createActivityButton}
          >
            Aktiviteni Yarat
          </Button>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityCreate);
