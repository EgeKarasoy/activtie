// @flow

import React from 'react';
import PropTypes from 'prop-types';

import contactData from '../contact.json';

import Profile from './Profile';

const ProfileScreen = (): React$Element< * > => <Profile {...contactData} />;

ProfileScreen.navigationOptions = (): any => ({
  header: null,
});

ProfileScreen.propTypes = {
  navigation: PropTypes.object,
};

export default ProfileScreen;
