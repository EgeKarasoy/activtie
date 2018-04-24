// @flow

import { createReducer, createActions } from 'reduxsauce';
// import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  goAllCities: null,
  goAllCitiesCompleted: null,
  activityNameChange: ['activityName'],
  activityDescriptionChange: ['activityDescription'],
  categoryPickerValueChange: ['categoryPickerValue'],
  peopleCountChange: ['categoryPickerValue'],
});

export const ActivityTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export type ActivityStateType = {
  isGoAllCities: boolean,
  activityName: ?string,
  activityDescription: ?string,
  categoryPickerValue: ?string,
  peopleCount: ?number
};

export const INITIAL_STATE: ActivityStateType = ({
  isGoAllCities: false,
  isGoProfileCard: false,
  activityName: '',
  activityDescription: '',
  categoryPickerValue: '',
  peopleCount: 2,
}: ActivityStateType);

/* ------------- Reducers ------------- */

const goAllCities = (state: ActivityStateType): ActivityStateType =>
  Object.assign({}, state, { isGoAllCities: true });

const goAllCitiesCompleted = (state: ActivityStateType): ActivityStateType =>
  Object.assign({}, state, { isGoAllCities: false });

const activityNameChange = (
  state: ActivityStateType,
  { activityName }: Object,
): ActivityStateType => Object.assign({}, state, { activityName });

const activityDescriptionChange = (
  state: ActivityStateType,
  { activityDescription }: Object,
): ActivityStateType => Object.assign({}, state, { activityDescription });

const categoryPickerValueChange = (
  state: ActivityStateType,
  { categoryPickerValue }: Object,
): ActivityStateType => Object.assign({}, state, { categoryPickerValue });

const peopleCountChange = (
  state: ActivityStateType,
  { peopleCount }: Object,
): ActivityStateType => Object.assign({}, state, { peopleCount });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GO_ALL_CITIES]: goAllCities,
  [Types.GO_ALL_CITIES_COMPLETED]: goAllCitiesCompleted,
  [Types.ACTIVITY_NAME_CHANGE]: activityNameChange,
  [Types.ACTIVITY_DESCRIPTION_CHANGE]: activityDescriptionChange,
  [Types.CATEGORY_PICKER_VALUE_CHANGE]: categoryPickerValueChange,
  [Types.PEOPLE_COUNT_CHANGE]: peopleCountChange,
});

/* ------------- Selectors ------------- */
