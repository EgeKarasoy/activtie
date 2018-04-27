// @flow

import React, { Component } from 'react';
// import { StyleSheet } from 'react-native';
import {
  ActionsContainer,
  Button,
  FieldsContainer,
  Fieldset,
  Form,
  FormGroup,
  Input,
  Label,
  Select,
} from 'react-native-clean-form';
import DatePicker from 'react-native-datepicker';
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
  activityName: ?string,
  activityNameChange: Function,
  activityDescription: ?string,
  activityDescriptionChange: Function,
  userNumber: ?number,
  userNumberChange: Function,
  date: ?string,
  dateChange: Function,
  createActivityButton: Function,
  time: ?string,
  timeChange: Function,
  categoryPickerValue: ?string,
  categoryPickerValueChange: Function,
  cityNameChange: Function,
  cityName: ?string
};

class ActivityCreate extends Component<ActivityCreatePropType> {
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
                onChangeText={this.props.activityNameChange}
                value={this.props.activityName}
                maxLength={255}
              />
            </FormGroup>
            <FormGroup>
              <Label> Aktivitene Açıklama Yaz..</Label>
              <Input
                placeholder="Baharda guzel bir yuruyus"
                autoCorrect={false}
                onChangeText={this.props.activityDescriptionChange}
                value={this.props.activityDescription}
                maxLength={1027}
              />
            </FormGroup>
            <FormGroup>
              <Label> Kategorini Seç</Label>
              <Select
                name="categories"
                options={categoryOptions}
                placeholder="Spor"
                selectedValue={this.props.categoryPickerValue}
                onValueChange={this.props.categoryPickerValueChange}
              />
            </FormGroup>
            <FormGroup>
              <Label> Kişi Sayısı</Label>
              <Input
                placeholder="5"
                autoCorrect={false}
                onChangeText={this.props.userNumberChange}
                value={this.props.userNumber}
                maxLength={2}
              />
            </FormGroup>
          </Fieldset>
          <Fieldset label="Ne Zaman, Nerede?" last>
            <FormGroup>
              <Label> Şehrin Nedir?</Label>
              <Select
                name="cities"
                options={cityOptions}
                placeholder="Izmir"
                onChangeText={this.props.cityNameChange}
                value={this.props.cityName}
                />
            </FormGroup>
            <FormGroup>
              <Label> Tarih Sec </Label>
              <DatePicker
                style={{ width: 200 }}
                date={this.props.date}
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
                onDateChange={this.props.dateChange}
              />
            </FormGroup>
            <FormGroup>
              <Label> Saat Sec </Label>
              <DatePicker
                style={{ width: 200 }}
                date={this.props.time}
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
                onDateChange={this.props.timeChange}
              />
            </FormGroup>
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
  activityNameChange: (text: ?string) => {
    console.log(text);
    dispatch(ActivityActionCreators.activityNameChange(text));
  },
  activityDescriptionChange: (text: ?string) => {
    console.log(text);
    dispatch(ActivityActionCreators.activityDescriptionChange(text));
  },
  categoryPickerValueChange: (text: ?string) => {
    console.log(text);
    dispatch(ActivityActionCreators.categoryPickerValueChange(text));
  },

});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  activityName: state.activity.activityName,
  activityDescription: state.activity.activityDescription,
  categoryPickerValue: state.activity.categoryPickerValue,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityCreate);
