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
// import ActivityMain from './ActivityMain';
import ActivitySearchDetail from './ActivitySearchDetail';

type ActivitySearchPropType = {
  activitySearchName: ?string,
  activitySearchNameChange: Function,
  activitySearchCategoryTypePickerValue: ?string,
  activitySearchCategoryTypePickerValueChange: Function,
  activitySearchCategoryNamePickerValue: ?string,
  activitySearchCategoryNamePickerValueChange: Function,
  activitySearchCityNameChange: Function,
  activitySearchCityName: ?string,
  getCityData: Function,
  cityData: Array< mixed >,
  getCategoryData: Function,
  categoryData: Array< mixed >,
  goActivitySearchDetailCheck: Function,
  goActivitySearchDetail: boolean,
  activitySearchErrorChange: Function,
  activitySearchError: ?string,
  getSearchData: Function
  // searchData: Array< mixed >
};

class ActivitySearch extends Component<ActivitySearchPropType> {
  componentDidMount() {
    const cities = this.getActivityCities
    cities();
    const categories = this.getActivityCategories
    categories();
    // console.disableYellowBox = true;
  }

  onPressButtonSearch= () => {
    if ((this.props.activitySearchName.length < 1) &&
    (this.props.activitySearchCategoryTypePickerValue.length < 1) &&
      (this.props.activitySearchCategoryNamePickerValue.length < 1) &&
        (this.props.activitySearchCityName.length < 1)) {
      const error1 = this.props.activitySearchErrorChange;
      error1('En az bir arama sonucu girin..');
    }
    else {
      const errorReset = this.props.activitySearchErrorChange;
      errorReset('');
      this.postActivitySearch();
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

  postActivitySearch= () => {
    fetch('http://activtie.com/api/search_activity', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activity_name: this.props.activitySearchName,
        category_type: this.props.activitySearchCategoryTypePickerValue,
        category_name: this.props.activitySearchCategoryNamePickerValue,
        city_name: this.props.activitySearchCityName,
        activity_time: null,
      }),
    })
      .then((response: any): any => {
        console.log(response);
        return response.json();
      })
      .then((responseJson: any) => {
        const sendSearchData = this.props.getSearchData;
        sendSearchData(responseJson);
        const goDetail = this.props.goActivitySearchDetailCheck;
        goDetail();
      })
      .catch(() => {
        Alert.alert(
          'Üzgünüz!',
          'Aradığın Aktivite Bulunamadı, İstersen Sen Yarat!',
          [
            { text: 'Tamam', onPress: (): void => console.log('Tamama Basıldı') },
          ],
          { cancelable: false },
        )
      });
  };

  render(): React$Element< * > {
    if (this.props.goActivitySearchDetail === true) return <ActivitySearchDetail />;
    return (
      <Form>
        <ActivityHeader />
        <FieldsContainer>
          <Fieldset label="Aktivite Arama">
            <FormGroup>
              <Label> Aktivite Adi ile Ara</Label>
              <Input
                placeholder="Doga Yuruyusu"
                autoCorrect={false}
                onChangeText={this.props.activitySearchNameChange}
                value={this.props.activitySearchName}
                maxLength={255}
              />
            </FormGroup>
            <FormGroup>
              <Label> Kategorini Tipi ile Ara</Label>
              <Picker
                name="categories"
                mode="dropdown"
                placeHolder="Spor"
                placeholderStyle={{ color: 'black' }}
                iosHeader="Spor"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                onValueChange={this.props.activitySearchCategoryTypePickerValueChange}
                selectedValue={this.props.activitySearchCategoryTypePickerValue}
              >
                { this.props.categoryData.map((item: any, key: any): any => (
                  <Picker.Item label={item.category_type} value={item.category_type} key={key} />))}
              </Picker>
            </FormGroup>
            <FormGroup>
              <Label> Kategorini Adi ile Ara</Label>
              <Picker
                name="categories"
                mode="dropdown"
                placeHolder="Spor"
                placeholderStyle={{ color: 'black' }}
                iosHeader="Spor"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                onValueChange={this.props.activitySearchCategoryNamePickerValueChange}
                selectedValue={this.props.activitySearchCategoryNamePickerValue}
              >
                { this.props.categoryData.map((item: any, key: any): any => (
                  <Picker.Item label={item.category_name} value={item.category_name} key={key} />))}
              </Picker>
            </FormGroup>
            <FormGroup>
              <Label> Şehre Gore Ara</Label>
              <Picker
                name="cities"
                mode="dropdown"
                placeHolder="Izmir"
                placeholderStyle={{ color: 'black' }}
                iosHeader="Izmir"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                onValueChange={this.props.activitySearchCityNameChange}
                selectedValue={this.props.activitySearchCityName}
              >
                { this.props.cityData.map((item: any, key: any): any => (
                  <Picker.Item label={item.city_name} value={item.city_name} key={key} />))}
              </Picker>
            </FormGroup>
          </Fieldset>
        </FieldsContainer>
        <ActionsContainer>
          <Button
            icon="md-checkmark"
            iconPlacement="right"
            onPress={this.onPressButtonSearch}
          >
            Aktiviteni Ara
          </Button>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>{this.props.activitySearchError}</Text>
        </ActionsContainer>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  activitySearchNameChange: (value: ?Object) => {
    console.log(value);
    dispatch(ActivityActionCreators.activitySearchNameChange(value));
  },
  activitySearchCategoryTypePickerValueChange: (value: ?Object) => {
    console.log(value);
    dispatch(ActivityActionCreators.activitySearchCategoryTypePickerValueChange(value));
  },
  activitySearchCategoryNamePickerValueChange: (value: ?Object) => {
    console.log(value);
    dispatch(ActivityActionCreators.activitySearchCategoryNamePickerValueChange(value));
  },
  activitySearchCityNameChange: (value: ?Object) => {
    console.log(value);
    dispatch(ActivityActionCreators.activitySearchCityNameChange(value));
  },
  getCityData: (value: ?Object) => {
    console.log(value);
    dispatch(ActivityActionCreators.getCityData(value));
  },
  getCategoryData: (value: ?Object) => {
    console.log(value);
    dispatch(ActivityActionCreators.getCategoryData(value));
  },
  getSearchData: (value: ?Object) => {
    console.log(value);
    dispatch(ActivityActionCreators.getSearchData(value));
  },
  activitySearchErrorChange: (value: ?Object) => {
    console.log(value);
    dispatch(ActivityActionCreators.activitySearchErrorChange(value));
  },
  goActivitySearchDetailCheck: () => {
    dispatch(ActivityActionCreators.goActivitySearchDetailCheck());
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  activitySearchName: state.activity.activitySearchName,
  activitySearchCategoryTypePickerValue: state.activity.activitySearchCategoryTypePickerValue,
  activitySearchCategoryNamePickerValue: state.activity.activitySearchCategoryNamePickerValue,
  activitySearchCityName: state.activity.activitySearchCityName,
  cityData: state.activity.cityData,
  categoryData: state.activity.categoryData,
  activitySearchError: state.activity.activitySearchError,
  goActivitySearchDetail: state.activity.goActivitySearchDetail,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivitySearch);
