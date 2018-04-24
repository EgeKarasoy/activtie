// @flow

import React, { Component } from 'react';
import { Text, Image } from 'react-native';
// import SearchBar from 'react-native-searchbar';
import { SearchBar } from 'react-native-elements';
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Thumbnail,
  Button,
  Icon,
} from 'native-base';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import type { StateType } from '../Redux/index';
import ProfileActionCreators from '../Redux/ProfileRedux';
import ActivityHeader from './ActivityHeader';
import IndexCard from './Profile/IndexCard';

// const items = [
//   1337,
//   'halisaha1',
//   'halisaha2',
//   'basketbol',
//   'yemek1',
//   'yemek2',
//   'yemek3',
//   'doga yuruyusu',
//   {
//     lots: 'of',
//     different: {
//       types: 0,
//       data: false,
//       that: {
//         can: {
//           be: {
//             quite: {
//               complex: {
//                 hidden: ['gold!'],
//               },
//             },
//           },
//         },
//       },
//     },
//   },
//   [4, 2, 'tree'],
// ];

type ActivitySearchPropType = {
  goProfileCardButton: Function
};

class ActivitySearch extends Component<ActivitySearchPropType> {
  // constructor(props: any) {
  //   super(props);
  //   this.state = {
  //     items,
  //     results: [],
  //   };
  //   this.handleResults = this.handleResults.bind(this);
  // }

  // handleResults(results: any) {
  //   this.setState({ results });
  // }

  render(): React$Element< * > {
    if (this.props.isGoProfileCard) return <IndexCard />;

    return (
      // <View>
      // <View style={{ marginTop: 110 }}>
      //   {this.state.results.map((result, i) => (
      //     <Text key={i}>
      //       {typeof result === 'object' && !(result instanceof Array)
      //         ? 'gold object!'
      //         : result.toString()}
      //     </Text>
      //   ))}
      // </View>
      // <SearchBar
      //   allDataOnEmptySearch
      //   data={items}
      //   handleResults={this._handleResults}
      //   showOnLoad
      //   hideBack
      //   autoCorrect={false}
      //   placeholder="Aktivite Ara.."
      // />
      // </View>
      <Container>
        <ActivityHeader />
        {/* <View>
          {this.state.results.map((result, i) => (
            <Text key={i}>
              {typeof result === 'object' && !(result instanceof Array)
                ? 'gold object!'
                : result.toString()}
            </Text>
          ))}
        </View> */}
        <SearchBar
          round
          allDataOnEmptySearch
          lightTheme
          onChangeText={null}
          showOnLoad
          hideBack
          cancelButtonTitle="İptal"
          autoCorrect={false}
          placeholder="Aktivite Ara.."
        />
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require('../Images/egekrsy.jpg')} />
                <Body>
                  <Text>Duman Bahar Konseri</Text>
                  <Text note style={{ fontStyle: 'italic' }}>
                    Beraber gidecegim arkadaş arıyorum
                  </Text>
                  <Button
                    transparent
                    dark
                    onPress={this.props.goProfileCardButton}
                  >
                    <Text style={{ fontWeight: 'bold', color: 'blue' }}>
                      Ege Karasoy
                    </Text>
                  </Button>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={require('../Images/concert.jpg')}
                style={{ height: 200, width: null, flex: 1 }}
              />
            </CardItem>
            <Button full warning>
              <Text> KATIL !</Text>
            </Button>
            <CardItem>
              <Left>
                <Text>
                  <Icon active name="pin" /> Izmir
                </Text>
              </Left>
              <Body>
                <Text>
                  <Icon active name="people" /> 4 Kisi
                </Text>
              </Body>
              <Right>
                <Text>
                  <Icon active name="time" /> 19:00
                </Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  goProfileCardButton: () => {
    dispatch(ProfileActionCreators.goProfileCard());
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  isGoProfileCard: state.profile.isGoProfileCard,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivitySearch);
