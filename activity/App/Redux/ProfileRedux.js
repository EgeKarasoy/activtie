// @flow

import { createReducer, createActions } from 'reduxsauce';
// import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  goActivityDetail: ['activityDetailId'],
  goActivityDetailCompleted: null,
  goActivityDetailProfileCard: ['creatorId'],
  goActivityDetailProfileCardCompleted: null,
  notificationsAvaibleCheck: null,
  notificationsAvaibleCheckCompleted: null,
  messagesAvaibleCheck: null,
  messagesAvaibleCheckCompleted: null,
  getProfileNotificationsData: ['profileNotificationsData'],
  getProfileMessagesData: ['profileMessagesData'],
  notificationsMessageTypeAccept: ['notificationsMessageType'],
  notificationsMessageTypeDecline: ['notificationsMessageType'],
  notificationsMessageTypeNull: ['notificationsMessageType'],
  notificationsRequestKeeper: ['notificationsRequest'],
  getProfileNotificationsMessageId: ['notificationsMessageId'],
  getProfileData: ['profileData'],
  getMyActivitiesJoinedData: ['myActivitiesJoinedData'],
  getMyActivitiesCreatedData: ['myActivitiesCreatedData'],
  myActivitiesJoinedCheck: null,
  myActivitiesJoinedCheckCompleted: null,
  myActivitiesCreatedCheck: null,
  myActivitiesCreatedCheckCompleted: null,
  getActivityDetailData: ['activityDetailData'],
  getActivityDetailInCommentData: ['activityDetailInCommentData'],
  inCommentAvaibleCheck: ['isInCommentAvaible'],
  activityDetailMessageChange: ['activityDetailMessage'],
  messageErrorChange: ['messageError'],
  getUsersInActivityData: ['usersInActivityData'],
  informationDateChange: ['informationDate'],
  informationNameChange: ['informationName'],
  informationSurnameChange: ['informationSurname'],
  informationInfoChange: ['informationInfo'],
  informationPhoneChange: ['informationPhone'],
  informationEmailChange: ['informationEmail'],
  informationErrorChange: ['informationError'],
  updateProfileChange: null,
  updateProfileChangeCompleted: null,
});

export const ProfileTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export type ProfileStateType = {
  isGoActivityDetail: boolean,
  isGoActivityDetailProfileCard: boolean,
  isNotificationsAvaible: boolean,
  isMessagesAvaible: boolean,
  isInCommentAvaible: ?string,
  profileNotificationsData: Array< mixed >,
  profileMessagesData: Array< mixed >,
  notificationsMessageType: ?string,
  notificationsRequest: ?string,
  notificationsMessageId: ?string,
  profileData: Array< mixed >,
  myActivitiesJoinedData: Array< mixed >,
  myActivitiesCreatedData: Array< mixed >,
  isActivitiesJoined: boolean,
  isActivitiesCreated: boolean,
  activityDetailId: ?string,
  activityDetailData: Array< mixed >,
  activityDetailInCommentData: Array< mixed >,
  creatorId: ?string,
  activityDetailMessage: ?string,
  messageError: ?string,
  usersInActivityData: Array< mixed >,
  informationDate: ?string,
  informationName: ?string,
  informationSurname: ?string,
  informationInfo: ?string,
  informationEmail: ?string,
  informationPhone: ?string,
  informationError: ?string,
  goUpdateProfile: boolean
};

export const INITIAL_STATE: ProfileStateType = ({
  isGoActivityDetail: false,
  isGoActivityDetailProfileCard: false,
  isNotificationsAvaible: true,
  isMessagesAvaible: true,
  isInCommentAvaible: '',
  profileNotificationsData: [],
  profileMessagesData: [],
  notificationsMessageType: '',
  notificationsRequest: '',
  notificationsMessageId: '',
  profileData: [],
  myActivitiesJoinedData: [],
  myActivitiesCreatedData: [],
  isActivitiesJoined: true,
  isActivitiesCreated: true,
  activityDetailId: '',
  activityDetailData: [],
  activityDetailInCommentData: [],
  creatorId: '',
  activityDetailMessage: '',
  messageError: '',
  usersInActivityData: [],
  informationDate: '',
  informationName: '',
  informationSurname: '',
  informationInfo: '',
  informationPhone: '',
  informationEmail: '',
  informationError: '',
  goUpdateProfile: false,
}: ProfileStateType);

/* ------------- Reducers ------------- */

const goActivityDetail = (
  state: ProfileStateType,
  { activityDetailId }: Object,
): ProfileStateType =>
  Object.assign({}, state, {
    isGoActivityDetail: true,
    activityDetailId,
  });

const goActivityDetailCompleted = (state: ProfileStateType): ProfileStateType =>
  Object.assign({}, state, { isGoActivityDetail: false });

const notificationsAvaibleCheck = (state: ProfileStateType): ProfileStateType =>
  Object.assign({}, state, { isNotificationsAvaible: true });

const notificationsAvaibleCheckCompleted = (state: ProfileStateType): ProfileStateType =>
  Object.assign({}, state, { isNotificationsAvaible: false });

const updateProfileChange = (state: ProfileStateType): ProfileStateType =>
  Object.assign({}, state, { goUpdateProfile: true });

const updateProfileChangeCompleted = (state: ProfileStateType): ProfileStateType =>
  Object.assign({}, state, { goUpdateProfile: false });

const notificationsMessageTypeAccept = (
  state: ProfileStateType,
  { notificationsMessageType }: Object,
): ProfileStateType => Object.assign({}, state, { notificationsMessageType });

const notificationsMessageTypeDecline = (
  state: ProfileStateType,
  { notificationsMessageType }: Object,
): ProfileStateType => Object.assign({}, state, { notificationsMessageType });

const notificationsMessageTypeNull = (
  state: ProfileStateType,
  { notificationsMessageType }: Object,
): ProfileStateType => Object.assign({}, state, { notificationsMessageType });

const messagesAvaibleCheck = (state: ProfileStateType): ProfileStateType =>
  Object.assign({}, state, { isMessagesAvaible: true });

const inCommentAvaibleCheck = (
  state: ProfileStateType,
  { isInCommentAvaible }: Object,
): ProfileStateType => Object.assign({}, state, { isInCommentAvaible });

const messagesAvaibleCheckCompleted = (state: ProfileStateType): ProfileStateType => Object.assign({}, state, { isMessagesAvaible: false });

const goActivityDetailProfileCard = (
  state: ProfileStateType,
  { creatorId }: Object,
): ProfileStateType =>
  Object.assign({}, state, {
    isGoActivityDetailProfileCard: true,
    creatorId,
  });

const goActivityDetailProfileCardCompleted = (state: ProfileStateType): ProfileStateType =>
  Object.assign({}, state, { isGoActivityDetailProfileCard: false });

const getProfileNotificationsData = (
  state: ProfileStateType,
  { profileNotificationsData }: Object,
): ProfileStateType => Object.assign({}, state, { profileNotificationsData });

const getProfileMessagesData = (
  state: ProfileStateType,
  { profileMessagesData }: Object,
): ProfileStateType => Object.assign({}, state, { profileMessagesData });

const notificationsRequestKeeper = (
  state: ProfileStateType,
  { notificationsRequest }: Object,
): ProfileStateType => Object.assign({}, state, { notificationsRequest });

const getProfileNotificationsMessageId = (
  state: ProfileStateType,
  { notificationsMessageId }: Object,
): ProfileStateType => Object.assign({}, state, { notificationsMessageId });

const getProfileData = (
  state: ProfileStateType,
  { profileData }: Object,
): ProfileStateType => Object.assign({}, state, { profileData });

const getMyActivitiesJoinedData = (
  state: ProfileStateType,
  { myActivitiesJoinedData }: Object,
): ProfileStateType => Object.assign({}, state, { myActivitiesJoinedData });

const getMyActivitiesCreatedData = (
  state: ProfileStateType,
  { myActivitiesCreatedData }: Object,
): ProfileStateType => Object.assign({}, state, { myActivitiesCreatedData });

const getActivityDetailData = (
  state: ProfileStateType,
  { activityDetailData }: Object,
): ProfileStateType => Object.assign({}, state, { activityDetailData });

const getActivityDetailInCommentData = (
  state: ProfileStateType,
  { activityDetailInCommentData }: Object,
): ProfileStateType => Object.assign({}, state, { activityDetailInCommentData });

const activityDetailMessageChange = (
  state: ProfileStateType,
  { activityDetailMessage }: Object,
): ProfileStateType => Object.assign({}, state, { activityDetailMessage });

const messageErrorChange = (
  state: ProfileStateType,
  { messageError }: Object,
): ProfileStateType => Object.assign({}, state, { messageError });

const getUsersInActivityData = (
  state: ProfileStateType,
  { usersInActivityData }: Object,
): ProfileStateType => Object.assign({}, state, { usersInActivityData });

const informationDateChange = (
  state: ProfileStateType,
  { informationDate }: Object,
): ProfileStateType => Object.assign({}, state, { informationDate });

const informationNameChange = (
  state: ProfileStateType,
  { informationName }: Object,
): ProfileStateType => Object.assign({}, state, { informationName });

const informationSurnameChange = (
  state: ProfileStateType,
  { informationSurname }: Object,
): ProfileStateType => Object.assign({}, state, { informationSurname });

const informationInfoChange = (
  state: ProfileStateType,
  { informationInfo }: Object,
): ProfileStateType => Object.assign({}, state, { informationInfo });

const informationPhoneChange = (
  state: ProfileStateType,
  { informationPhone }: Object,
): ProfileStateType => Object.assign({}, state, { informationPhone });

const informationEmailChange = (
  state: ProfileStateType,
  { informationEmail }: Object,
): ProfileStateType => Object.assign({}, state, { informationEmail });

const informationErrorChange = (
  state: ProfileStateType,
  { informationError }: Object,
): ProfileStateType => Object.assign({}, state, { informationError });

const myActivitiesJoinedCheck = (state: ProfileStateType): ProfileStateType =>
  Object.assign({}, state, { isActivitiesJoined: true });

const myActivitiesJoinedCheckCompleted = (state: ProfileStateType): ProfileStateType => Object.assign({}, state, { isActivitiesJoined: false });

const myActivitiesCreatedCheck = (state: ProfileStateType): ProfileStateType =>
  Object.assign({}, state, { isActivitiesCreated: true });

const myActivitiesCreatedCheckCompleted = (state: ProfileStateType): ProfileStateType => Object.assign({}, state, { isActivitiesCreated: false });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GO_ACTIVITY_DETAIL]: goActivityDetail,
  [Types.GO_ACTIVITY_DETAIL_COMPLETED]: goActivityDetailCompleted,
  [Types.GO_ACTIVITY_DETAIL_PROFILE_CARD]: goActivityDetailProfileCard,
  [Types.GO_ACTIVITY_DETAIL_PROFILE_CARD_COMPLETED]: goActivityDetailProfileCardCompleted,
  [Types.NOTIFICATIONS_AVAIBLE_CHECK]: notificationsAvaibleCheck,
  [Types.NOTIFICATIONS_AVAIBLE_CHECK_COMPLETED]: notificationsAvaibleCheckCompleted,
  [Types.MESSAGES_AVAIBLE_CHECK]: messagesAvaibleCheck,
  [Types.MESSAGES_AVAIBLE_CHECK_COMPLETED]: messagesAvaibleCheckCompleted,
  [Types.GET_PROFILE_NOTIFICATIONS_DATA]: getProfileNotificationsData,
  [Types.GET_PROFILE_MESSAGES_DATA]: getProfileMessagesData,
  [Types.NOTIFICATIONS_MESSAGE_TYPE_ACCEPT]: notificationsMessageTypeAccept,
  [Types.NOTIFICATIONS_MESSAGE_TYPE_DECLINE]: notificationsMessageTypeDecline,
  [Types.NOTIFICATIONS_MESSAGE_TYPE_NULL]: notificationsMessageTypeNull,
  [Types.NOTIFICATIONS_REQUEST_KEEPER]: notificationsRequestKeeper,
  [Types.GET_PROFILE_NOTIFICATIONS_MESSAGE_ID]: getProfileNotificationsMessageId,
  [Types.GET_PROFILE_DATA]: getProfileData,
  [Types.GET_MY_ACTIVITIES_JOINED_DATA]: getMyActivitiesJoinedData,
  [Types.GET_MY_ACTIVITIES_CREATED_DATA]: getMyActivitiesCreatedData,
  [Types.MY_ACTIVITIES_JOINED_CHECK]: myActivitiesJoinedCheck,
  [Types.MY_ACTIVITIES_JOINED_CHECK_COMPLETED]: myActivitiesJoinedCheckCompleted,
  [Types.MY_ACTIVITIES_CREATED_CHECK]: myActivitiesCreatedCheck,
  [Types.MY_ACTIVITIES_CREATED_CHECK_COMPLETED]: myActivitiesCreatedCheckCompleted,
  [Types.GET_ACTIVITY_DETAIL_DATA]: getActivityDetailData,
  [Types.GET_ACTIVITY_DETAIL_IN_COMMENT_DATA]: getActivityDetailInCommentData,
  [Types.IN_COMMENT_AVAIBLE_CHECK]: inCommentAvaibleCheck,
  [Types.ACTIVITY_DETAIL_MESSAGE_CHANGE]: activityDetailMessageChange,
  [Types.MESSAGE_ERROR_CHANGE]: messageErrorChange,
  [Types.GET_USERS_IN_ACTIVITY_DATA]: getUsersInActivityData,
  [Types.INFORMATION_DATE_CHANGE]: informationDateChange,
  [Types.INFORMATION_NAME_CHANGE]: informationNameChange,
  [Types.INFORMATION_SURNAME_CHANGE]: informationSurnameChange,
  [Types.INFORMATION_INFO_CHANGE]: informationInfoChange,
  [Types.INFORMATION_PHONE_CHANGE]: informationPhoneChange,
  [Types.INFORMATION_EMAIL_CHANGE]: informationEmailChange,
  [Types.INFORMATION_ERROR_CHANGE]: informationErrorChange,
  [Types.UPDATE_PROFILE_CHANGE]: updateProfileChange,
  [Types.UPDATE_PROFILE_CHANGE_COMPLETED]: updateProfileChangeCompleted,
});

/* ------------- Selectors ------------- */
