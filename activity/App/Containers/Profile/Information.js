// @flow

import React, { Component } from 'react';
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

export default class Information extends Component<*> {
  constructor(props: any) {
    super(props);
    this.state = {
      selected1: 'key0',
      date: '2017-12-31',
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected1: value,
    });
  }

  render(): React$Element< * > {
    return (
      <Container>
        <Content padder>
          <Text style={{ fontWeight: 'bold' }}> Ad-Soyad</Text>
          <Item regular>
            <Input placeholder="Ad" />
          </Item>
          <Item regular>
            <Input placeholder="Soyad" />
          </Item>
          <Text style={{ fontWeight: 'bold' }}> Hesap Gizliliği</Text>
          <Form>
            <Picker
              iosHeader="Seçin"
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Public" value="key0" />
              <Picker.Item label="Private" value="key1" />
            </Picker>
          </Form>
          <Form>
            <Text style={{ fontWeight: 'bold' }}> Doğum Tarihin</Text>
            <DatePicker
              style={{ width: 200 }}
              date={this.state.date}
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
              onDateChange={(date: string) => {
                this.setState({ date });
              }}
            />
          </Form>
          <Text style={{ fontWeight: 'bold' }}> Açıklamanı Değiştir</Text>
          <Form>
            <Textarea rowSpan={3} bordered placeholder="Futbolu severim.." />
          </Form>
          <Button full warning>
            <Text>KAYDET</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
