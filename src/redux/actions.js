import { createAction } from "redux-actions";
import constants from "./constants";

export const loginRequest = createAction(constants.LOGIN_REQUEST);
export const loginSuccess = createAction(constants.LOGIN_SUCCESS);
export const loginError = createAction(constants.LOGIN_ERROR);
export const logout = createAction(constants.LOGOUT);

export const signupRequest = createAction(constants.SIGNUP_REQUEST);
export const signupSuccess = createAction(constants.SIGNUP_SUCCESS);
export const signupError = createAction(constants.SIGNUP_ERROR);

export const socialLoginRequest = createAction(constants.SOCIAL_LOGIN_REQEST);
export const socialLoginSuccess = createAction(constants.SOCIAL_LOGIN_SUCCESS);
export const socialLoginError = createAction(constants.SOCIAL_LOGIN_ERROR);

export const forgotPasswordRequest = createAction(
  constants.FORGOT_PASSWORD_REQUEST
);
export const forgotPasswordSuccess = createAction(
  constants.FORGOT_PASSWORD_SUCCESS
);
export const forgotPasswordError = createAction(
  constants.FORGOT_PASSWORD_ERROR
);

export const getCategoriesRequest = createAction(
  constants.GET_CATEGORIES_REQUEST
);
export const getCategoriesSuccess = createAction(
  constants.GET_CATEGORIES_SUCCESS
);
export const getCategoriesError = createAction(constants.GET_CATEGORIES_ERROR);

export const getEventByIdRequest = createAction(
  constants.GET_EVENT_BY_ID_REQUEST
);
export const getEventByIdSuccess = createAction(
  constants.GET_EVENT_BY_ID_SUCCESS
);
export const getEventByIdError = createAction(constants.GET_EVENT_BY_ID_ERROR);

export const getLocationsRequest = createAction(
  constants.GET_LOCATIONS_REQUEST
);
export const getLocationsSuccess = createAction(
  constants.GET_LOCATIONS_SUCCESS
);

export const getLocationsError = createAction(constants.GET_LOCATIONS_ERROR);

export const contactUsRequest = createAction(constants.CONTACT_US_REQUEST);
export const contactUsSuccess = createAction(constants.CONTACT_US_SUCCESS);
export const contactUsError = createAction(constants.CONTACT_US_ERROR);

export const getEventsByCategoryRequest = createAction(
  constants.GET_EVENTS_BY_CATEGORY_REQUEST
);
export const getEventsByCategorySuccess = createAction(
  constants.GET_EVENTS_BY_CATEGORY_SUCCESS
);
export const getEventsByCategoryError = createAction(
  constants.GET_EVENTS_BY_CATEGORY_ERROR
);

export const getUserPostByIdRequest = createAction(
  constants.GET_USER_POST_BY_ID_REQUEST
);
export const getUserPostByIdSuccess = createAction(
  constants.GET_USER_POST_BY_ID_SUCCESS
);
export const getUserPostByIdError = createAction(
  constants.GET_USER_POST_BY_ID_ERROR
);

export const addReviewRequest = createAction(constants.ADD_REVIEW_REQUEST);
export const addReviewSuccess = createAction(constants.ADD_REVIEW_SUCCESS);
export const addReviewError = createAction(constants.ADD_REVIEW_ERROR);

export const getUserDataRequest = createAction(constants.GET_USER_DATA_REQUEST);
export const getUserDataSuccess = createAction(constants.GET_USER_DATA_SUCCESS);
export const getUserDataError = createAction(constants.GET_USER_DATA_ERROR);

export const updateUserRequest = createAction(constants.UPDATE_USER_REQUEST);
export const updateUserSuccess = createAction(constants.UPDATE_USER_SUCCESS);
export const updateUserError = createAction(constants.UPDATE_USER_ERROR);

export const updatePasswordRequest = createAction(
  constants.UPDATE_PASSWORD_REQUEST
);
export const updatePasswordSuccess = createAction(
  constants.UPDATE_PASSWORD_SUCCESS
);
export const updatePasswordError = createAction(
  constants.UPDATE_PASSWORD_ERROR
);

export const addInterestRequest = createAction(constants.ADD_INTEREST_REQUEST);
export const addInterestSuccess = createAction(constants.ADD_INTEREST_SUCCESS);
export const addInterestError = createAction(constants.ADD_INTEREST_ERROR);

export const stateChange = createAction(constants.STATE_CHANGE);
export const cityChange = createAction(constants.CITY_CHANGE);
export const monthYearChange = createAction(constants.MONTH_YEAR_CHANGE);
export const storableLocation = createAction(constants.STORABLE_LOCATION);

export const submitEventRequest = createAction(constants.SUBMIT_EVENT_REQUEST);
export const submitEventSuccess = createAction(constants.SUBMIT_EVENT_SUCCESS);
export const submitEventError = createAction(constants.SUBMIT_EVENT_ERROR);
export const submitEventReset = createAction(constants.SUBMIT_EVENT_RESET);

export const deleteEventRequest = createAction(constants.DELETE_EVENT_REQUEST);
export const deleteEventSuccess = createAction(constants.DELETE_EVENT_SUCCESS);
export const deleteEventError = createAction(constants.DELETE_EVENT_ERROR);

export const getFeaturedEventsRequest = createAction(constants.GET_FEATURED_EVENTS_REQUEST);
export const getFeaturedEventsSuccess = createAction(constants.GET_FEATURED_EVENTS_SUCCESS);
export const getFeaturedEventsError = createAction(constants.GET_FEATURED_EVENTS_ERROR);

export const getInterestRequest = createAction(constants.GET_INTEREST_REQUEST);
export const getInterestSuccess = createAction(constants.GET_INTEREST_SUCCESS);
export const getInterestError = createAction(constants.GET_INTEREST_ERROR);

export const updateEventRequest = createAction(constants.UPDATE_EVENT_REQUEST);
export const updateEventSuccess = createAction(constants.UPDATE_EVENT_SUCCESS);
export const updateEventError = createAction(constants.UPDATE_EVENT_ERROR);