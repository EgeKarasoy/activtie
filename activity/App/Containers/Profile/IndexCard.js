// @flow

import React from 'react';
import PropTypes from 'prop-types';

import contactData from '../contact.json';

import ProfileCard from './ProfileCard';

const ProfileScreen = (): React$Element< * > => <ProfileCard {...contactData} />;

ProfileScreen.navigationOptions = (): any => ({
  header: null,
});

ProfileScreen.propTypes = {
  navigation: PropTypes.object,
};

export default ProfileScreen;
