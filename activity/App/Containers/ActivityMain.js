// @flow

import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import { Content, Button, Left, Right, CardItem, Thumbnail, Body, Icon, Card } from 'native-base';
import Slideshow from 'react-native-slideshow';
import Category from 'react-native-category';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import type { StateType } from '../Redux/index';
import ProfileActionCreators from '../Redux/ProfileRedux';
import ActivityActionCreators from '../Redux/ActivityRedux';
import ActivityHeader from './ActivityHeader';
import IndexCard from './Profile/IndexCard';
import AllCities from './AllCities'
import ActivityJoin from './ActivityJoin'
import ActivitySearchDetail from './ActivitySearchDetail'

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'ios' ? 64 : 44,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 30 : 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  sectionStyles: {
    marginTop: 20,
  },
  title: {
    marginLeft: 8,
    marginBottom: 2,
    color: 'white',
  },
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

type ActivityMainPropType = {
  goProfileCardButton: Function,
  goAllCitiesButton: Function,
  getLatestActivityData: Function,
  latestActivityData: Array< mixed >,
  goActivityJoinButton: Function,
  goActivityMainCheckCompleted: Function,
  activitySearchCategoryNamePickerValue: ?string,
  activitySearchCityName: ?string,
  activitySearchCategoryNamePickerValueChange: Function,
  getSearchData: Function,
  goActivitySearchDetailCheck: Function,
  activitySearchCityNameChange: Function,
  activitySearchCategoryTypePickerValue: ?string,
  activitySearchName: ?string
};

class ActivityMain extends Component<ActivityMainPropType> {
  constructor(props: any) {
    super(props);

    this.arrImage2 = [
      'ios-football',
      'ios-people',
      'ios-cart',
      'ios-cafe',
      'ios-plane',
      'ios-walk',
    ];

    this.state = {
      position: 1,
      interval: null,
      dataSource: [
        {
          activity_id: 11,
          title: 'Latin Dans Etkinligi',
          caption: 'Istanbul',
          url: 'http://www.istanbuldansakademi.com/wp-content/uploads/2015/12/tango-768x461.jpg',
        },
        {
          activity_id: 10,
          title: 'Bostanlida Kahve',
          caption: 'Izmir',
          url: 'https://iasbh.tmgrup.com.tr/8a416c/752/395/0/163/800/583?u=https://isbh.tmgrup.com.tr/sbh/2018/05/01/turk-kahvesinin-faydalari-nelerdir-turk-kahvesi-nasil-yapilir-1525160577297.jpg',
        },
        {
          activity_id: 15,
          title: 'Bilkent Mayfest Etkinligi',
          caption: 'Ankara',
          url: 'http://radyobilkent.com/wp-content/uploads/2018/05/Ekran-Resmi-2018-05-04-09.47.41-1100x512.png',
        },
      ],
    };
  }

  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.state.dataSource.length
              ? 0
              : this.state.position + 1,
        });
      }, 5000),
    });
  }

  componentDidMount() {
    const latestActivities = this.props.getLatestActivityData
    latestActivities();
    const goMainCompleted = this.props.goActivityMainCheckCompleted
    goMainCompleted();
    // console.disableYellowBox = true;
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  itemTextChoose(item) {
    // alert(item.title);
  }

  itemIconChoose(item) {
    // alert(`icon ${item.index}`);
  }

  postActivityIzmirSearch= () => {
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
        city_name: 'İzmir',
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
  postActivityAnkaraSearch= () => {
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
        city_name: 'Ankara',
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
  postActivityIstanbulSearch= () => {
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
        city_name: 'İstanbul',
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
  postActivityBasketbolSearch= () => {
    fetch('http://activtie.com/api/search_activity', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activity_name: this.props.activitySearchName,
        category_type: this.props.activitySearchCategoryTypePickerValue,
        category_name: 'Basketbol',
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
  postActivityFutbolSearch= () => {
    fetch('http://activtie.com/api/search_activity', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activity_name: this.props.activitySearchName,
        category_type: this.props.activitySearchCategoryTypePickerValue,
        category_name: 'Futbol',
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
  postActivitySinemaSearch= () => {
    fetch('http://activtie.com/api/search_activity', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activity_name: this.props.activitySearchName,
        category_type: this.props.activitySearchCategoryTypePickerValue,
        category_name: 'Sinema',
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
  postActivityPartiSearch= () => {
    fetch('http://activtie.com/api/search_activity', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activity_name: this.props.activitySearchName,
        category_type: this.props.activitySearchCategoryTypePickerValue,
        category_name: 'Parti',
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
  postActivityKonserSearch= () => {
    fetch('http://activtie.com/api/search_activity', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activity_name: this.props.activitySearchName,
        category_type: this.props.activitySearchCategoryTypePickerValue,
        category_name: 'Konser',
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
  postActivityMangalSearch= () => {
    fetch('http://activtie.com/api/search_activity', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activity_name: this.props.activitySearchName,
        category_type: this.props.activitySearchCategoryTypePickerValue,
        category_name: 'Mangal',
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
  postActivityPiknikSearch= () => {
    fetch('http://activtie.com/api/search_activity', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activity_name: this.props.activitySearchName,
        category_type: this.props.activitySearchCategoryTypePickerValue,
        category_name: 'Piknik',
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
  postActivityGeziSearch= () => {
    fetch('http://activtie.com/api/search_activity', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activity_name: this.props.activitySearchName,
        category_type: this.props.activitySearchCategoryTypePickerValue,
        category_name: 'Gezi',
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
  postActivityBulusmaSearch= () => {
    fetch('http://activtie.com/api/search_activity', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activity_name: this.props.activitySearchName,
        category_type: this.props.activitySearchCategoryTypePickerValue,
        category_name: 'Buluşma',
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
  postActivityYemekSearch= () => {
    fetch('http://activtie.com/api/search_activity', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activity_name: this.props.activitySearchName,
        category_type: this.props.activitySearchCategoryTypePickerValue,
        category_name: 'Yemek',
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
  postActivityTenisSearch= () => {
    fetch('http://activtie.com/api/search_activity', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activity_name: this.props.activitySearchName,
        category_type: this.props.activitySearchCategoryTypePickerValue,
        category_name: 'Tenis',
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
    if (this.props.isGoProfileCard) return <IndexCard />;
    if (this.props.isGoAllCities) return <AllCities />;
    if (this.props.isGoActivityJoin) return <ActivityJoin />;
    if (this.props.goActivitySearchDetail === true) return <ActivitySearchDetail />;
    return (
      <Content>
        <ActivityHeader />
        <Text style={{ fontWeight: 'bold' }}>    Populer Aktiviteler</Text>
        <Slideshow
          dataSource={this.state.dataSource}
          position={this.state.position}
          onPositionChanged={position => this.setState({ position })}
          onPress={(): void => this.props.goActivityJoinButton('15')}
          // onPress={(): any => 
          //   { this.state.dataSource.map((item: any): any => 
          //     this.props.goActivityJoinButton(item.activity_id))
          //   }
          // }
        />
        <View>
          <View style={styles.sectionStyles}>
            <Text style={{ fontWeight: 'bold' }}>   Kategoriler</Text>
            {/* <Category
              style={{ backgroundColor: 'white' }}
              imageData={this.arrImage2}
              iconSet="Ionicons"
              iconSize={40}
              itemStyles={{
                paddingLeft: 16,
                paddingRight: 16,
                borderRadius: 32,
              }}
              colorItemDefault="gray"
              colorItemSelected="#FF4E50"
              itemSelected={item => this.itemIconChoose(item)}
            /> */}
            <View style={styles.itemContainer}>
              <ScrollView
                horizontal
                contentContainerStyle={{ justifyContent: 'space-around' }}
              >
                <Image
                  source={{ uri: 'https://www.7arti3.com/wp-content/uploads/2017/10/basketbolun-genc-yetenekleri-375x276.jpg' }}
                  style={{ height: 125, width: 75 }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button small full dark onPress={this.postActivityBasketbolSearch}>
                      <Text style={{ color: 'white' }}>Basketbol</Text>
                    </Button>
                  </View>
                </Image>
                <Image
                  source={{ uri: 'https://liter.kz/public/uploads/36506-6-beznadezhnyi_uzbekista_ru.jpg' }}
                  style={{ height: 125, width: 75 }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button small full dark onPress={this.postActivityFutbolSearch}>
                      <Text style={{ color: 'white' }}>Futbol</Text>
                    </Button>
                  </View>
                </Image>
                <Image
                  source={{ uri: 'http://i2.haber7.net//haber/haber7/photos/2018/12/umed_sinema_akademisi_istanbulda_basliyor_1521533574_4033.jpg' }}
                  style={{ height: 125, width: 75 }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button small full dark onPress={this.postActivitySinemaSearch}>
                      <Text style={{ color: 'white' }}>Sinema</Text>
                    </Button>
                  </View>
                </Image>
                <Image
                  source={{ uri: 'https://blogmedia.evbstatic.com/wp-content/uploads/bloguk/shutterstock_199419065-730x487.jpg' }}
                  style={{ height: 125, width: 75 }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button small full dark onPress={this.postActivityPartiSearch}>
                      <Text style={{ color: 'white' }}>Parti</Text>
                    </Button>
                  </View>
                </Image>
                <Image
                  source={{ uri: 'http://www.ekonomist.com.tr/wp-content/uploads/2017/05/1200023.jpg' }}
                  style={{ height: 125, width: 75 }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button small full dark onPress={this.postActivityKonserSearch}>
                      <Text style={{ color: 'white' }}>Konser</Text>
                    </Button>
                  </View>
                </Image>
                <Image
                  source={{ uri: 'http://cinyus.com/wp-content/uploads/2015/12/mangal-yapmak.jpg' }}
                  style={{ height: 125, width: 75 }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button small full dark onPress={this.postActivityMangalSearch}>
                      <Text style={{ color: 'white' }}>Mangal</Text>
                    </Button>
                  </View>
                </Image>
                <Image
                  source={{ uri: 'https://harbiyiyorum.com/wp-content/uploads/piknik-alanlari.png' }}
                  style={{ height: 125, width: 75 }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button small full dark onPress={this.postActivityPiknikSearch}>
                      <Text style={{ color: 'white' }}>Piknik</Text>
                    </Button>
                  </View>
                </Image>
                <Image
                  source={{ uri: 'https://www.sportscorptravel.com/wp-content/uploads/bb-plugin/cache/iStock_000062411790_Large-1024x670-panorama.jpg' }}
                  style={{ height: 125, width: 75 }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button small full dark onPress={this.postActivityGeziSearch}>
                      <Text style={{ color: 'white' }}>Gezi</Text>
                    </Button>
                  </View>
                </Image>
                <Image
                  source={{ uri: 'https://www.eharmony.co.uk/dating-advice/wp-content/uploads/2013/03/coping-with-shared-friends.jpg' }}
                  style={{ height: 125, width: 75 }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button small full dark onPress={this.postActivityBulusmaSearch}>
                      <Text style={{ color: 'white' }}>Buluşma</Text>
                    </Button>
                  </View>
                </Image>
                <Image
                  source={{ uri: 'http://i.hurimg.com/i/hurriyet/75/750x422/5aa25dc867b0a9137c080c74.jpg' }}
                  style={{ height: 125, width: 75 }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button small full dark onPress={this.postActivityTenisSearch}>
                      <Text style={{ color: 'white' }}>Tenis</Text>
                    </Button>
                  </View>
                </Image>
                <Image
                  source={{ uri: 'https://cdn.yemek.com/mncrop/940/625/uploads/2016/05/ev-yapimi-hamburger.jpg' }}
                  style={{ height: 125, width: 75 }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button small full dark onPress={this.postActivityYemekSearch}>
                      <Text style={{ color: 'white' }}>Yemek</Text>
                    </Button>
                  </View>
                </Image>
              </ScrollView>
            </View>
          </View>
          <CardItem>
            <Left>
              <Text style={{ fontWeight: 'bold' }}>Populer Sehirler</Text>
            </Left>
            <Right>
              <Button
                small
                style={{ backgroundColor: 'transparent', alignItems: 'flex-end', justifyContent: 'flex-end' }}
                onPress={this.props.goAllCitiesButton}
              >
                <Text>Tümünü Gör</Text>
              </Button>
            </Right>
          </CardItem>
          <View style={styles.itemContainer}>
            <Image
              source={require('../Images/izmir.jpg')}
              style={{ height: 150, width: 100 }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}
              >
                <Button small full dark onPress={this.postActivityIzmirSearch}>
                  <Text style={{ color: 'white' }}>Izmir</Text>
                </Button>
              </View>
            </Image>
            <Image
              source={require('../Images/istanbul.jpg')}
              style={{ height: 150, width: 100 }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}
              >
                <Button small full dark onPress={this.postActivityIstanbulSearch}>
                  <Text style={{ color: 'white' }}>Istanbul</Text>
                </Button>
              </View>
            </Image>
            <Image
              source={require('../Images/ankara.jpg')}
              style={{ height: 150, width: 100 }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}
              >
                <Button small full dark onPress={this.postActivityAnkaraSearch}>
                  <Text style={{ color: 'white' }}>Ankara</Text>
                </Button>
              </View>
            </Image>
          </View>
          <Text style={{ fontWeight: 'bold' }}>    En Son Aktiviteler</Text>
          <CardItem>
            <FlatList
              // numColumns={3}
              data={this.props.latestActivityData}
              keyExtractor={(x: any, i: any): any => i}
              renderItem={({ item }: any): React$Element< * > => (
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail source={require('../Images/activtielogo.jpeg')} />
                      <Body>
                        <Text>{`${item.activity_name}`}</Text>
                        <Text note style={{ fontStyle: 'italic' }}>
                            Kategori: {`${item.category_name}`}
                        </Text>
                        {/* <Button
                          transparent
                          dark
                          onPress={this.props.goProfileCardButton}
                        >
                          <Text style={{ fontWeight: 'bold', color: 'blue' }}>
                              Ege Karasoy
                          </Text>
                        </Button> */}
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Image
                      source={{ uri: `http://activtie.com/${item.activity_picture}` }}
                      style={{ height: 200, width: null, flex: 1 }}
                    />
                  </CardItem>
                  <Button full warning onPress={(): void => this.props.goActivityJoinButton(item.activity_id)}>
                    <Text> INCELE ! </Text>
                  </Button>
                  <CardItem>
                    <Left>
                      <Text>
                        <Icon active name="pin" /> {`${item.activity_city}            `}
                        <Text>
                          <Icon active name="people" /> {`${item.user_number}            `}
                          <Text>
                            <Icon active name="time" /> {`${item.creation_time}`}
                          </Text>
                        </Text>
                      </Text>
                    </Left>
                    {/* <Body>
                      <Text>
                        <Icon active name="people" /> {`${item.user_number}   `}
                        <Text>
                          <Icon active name="time" /> {`${item.creation_time}`}
                        </Text>
                      </Text>
                    </Body> */}
                    {/* <Right>
                      <Text>
                        <Icon active name="time" /> {`${item.creation_time}`}
                      </Text>
                    </Right> */}
                  </CardItem>
                </Card>
              )}
            />
          </CardItem>
        </View>
      </Content>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  goProfileCardButton: () => {
    dispatch(ProfileActionCreators.goProfileCard());
  },
  goAllCitiesButton: () => {
    dispatch(ActivityActionCreators.goAllCities());
  },
  goActivityMainCheckCompleted: () => {
    dispatch(ActivityActionCreators.goActivityMainCheckCompleted());
  },
  goActivityJoinButton: (value: Object) => {
    dispatch(ActivityActionCreators.goActivityJoin(value));
  },
  activitySearchCategoryNamePickerValueChange: (value: Object) => {
    dispatch(ActivityActionCreators.activitySearchCategoryNamePickerValueChange(value));
  },
  getSearchData: (value: Object) => {
    dispatch(ActivityActionCreators.getSearchData(value));
  },
  goActivitySearchDetailCheck: () => {
    dispatch(ActivityActionCreators.goActivitySearchDetailCheck());
  },
  activitySearchCityNameChange: (value: ?Object) => {
    console.log(value);
    dispatch(ActivityActionCreators.activitySearchCityNameChange(value));
  },
  getLatestActivityData: () => {
    // dispatch started fetch action
    fetch('http://activtie.com/api/activities/%7B%22keyword%22:%22latest%22%7D', { method: 'GET' })
      .then((response: any): any => response.json())
      .then((responseJson: any) => {
        dispatch(ActivityActionCreators.getLatestActivityData(responseJson));
      })
      .catch((error: any) => {
        console.error(error);
      });
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  isGoProfileCard: state.profile.isGoProfileCard,
  isGoAllCities: state.activity.isGoAllCities,
  isGoActivityJoin: state.activity.isGoActivityJoin,
  latestActivityData: state.activity.latestActivityData,
  activityId: state.activity.activityId,
  activitySearchCategoryNamePickerValue: state.activity.activitySearchCategoryNamePickerValue,
  activitySearchCityName: state.activity.activitySearchCityName,
  goActivitySearchDetail: state.activity.goActivitySearchDetail,
  activitySearchName: state.activity.activitySearchName,
  activitySearchCategoryTypePickerValue: state.activity.activitySearchCategoryTypePickerValue,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityMain);
