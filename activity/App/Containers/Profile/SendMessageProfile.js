// @flow

import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Textarea,
  Form,
  Button,
  Header,
} from 'native-base';
import { connect } from 'react-redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { MapStateToProps, MapDispatchToProps } from 'react-redux';
import type { StateType } from '../../Redux/index';
import ProfileActionCreators from '../../Redux/ProfileRedux';

type SendMessageProfilePropType = {
  goProfileCardCompletedFunc: Function
};

class SendMessageProfile extends Component<SendMessageProfilePropType> {
  render(): React$Element< * > {
    return (
      <Container>
        <Button
          full
          success
          small
          onPress={this.props.goProfileCardCompletedFunc}
        >
          <Text> Geri Dön</Text>
        </Button>
        <Content padder>
          <Text style={{ fontWeight: 'bold' }}> Mesajını Yaz </Text>
          <Form>
            <Textarea
              rowSpan={3}
              bordered
              placeholder="Etkinliğine Katılabilir miyim ?"
            />
          </Form>
          <Button full warning>
            <Text>GÖNDER</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): MapDispatchToProps => ({
  goProfileCardCompletedFunc: () => {
    dispatch(ProfileActionCreators.goProfileCardCompleted());
  },
});

const mapStateToProps = (state: StateType): MapStateToProps => ({
  isGoProfileCard: state.profile.isGoProfileCard,
});

export default connect(mapStateToProps, mapDispatchToProps)(SendMessageProfile);
