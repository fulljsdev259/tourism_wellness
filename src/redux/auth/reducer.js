import { handleActions } from "redux-actions";
import update from "immutability-helper";
import constants from "../constants";

const initialState = {
  login: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: {}
  },
  socialLogin: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: {}
  },
  signup: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: {}
  },
  forgotPassword: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: {}
  },
  userdata: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: {}
  },
  profileInfoUpdate: {
    isLoading: false,
    isSuccess: false,
    isError: false
  },
  passwordUpdate: {
    isLoading: false,
    isSuccess: false,
    isError: false
  },
  contactUs: {
    isLoading: false,
    isSuccess: false,
    isError: false
  },
  addInterest: {
    isLoading: false,
    isSuccess: false,
    isError: false
  }
};
// const handleForgotRequest = (state, action) =>
//   update(state, {
//     login: {
//       isLoading: { $set: true },
//       isSuccess: { $set: false },
//       isError: { $set: false },
//       message: { $set: "" }
//     }
//   });
// const handleForgotError = (state, action) =>
//   update(state, {
//     login: {
//       isLoading: { $set: false },
//       isSuccess: { $set: false },
//       isError: { $set: true },
//       message: { $set: action.payload }
//     }
//   });
// const handleForgotSuccess = (state, action) =>
//   update(state, {
//     login: {
//       isLoading: { $set: false },
//       isSuccess: { $set: true },
//       isError: { $set: false },
//       data: { $set: action.payload }
//     }
//   });
const handleLoginRequest = (state, action) =>
  update(state, {
    login: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" }
    }
  });

const handleLoginSuccess = (state, action) =>
  update(state, {
    login: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload }
    }
  });
const handleLoginError = (state, action) =>
  update(state, {
    login: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload }
    }
  });

const handleSocialLoginRequest = (state, action) =>
  update(state, {
    socialLogin: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" }
    }
  });
const handleSocialLoginSuccess = (state, action) =>
  update(state, {
    socialLogin: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload }
    }
  });
const handleSocialLoginError = (state, action) =>
  update(state, {
    socialLogin: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload }
    }
  });

// const handleLoginReset = (state, action) =>
//   update(state, { $merge: initialState });

const handleSignupRequest = (state, action) =>
  update(state, {
    signup: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" }
    }
  });
const handleSignupSuccess = (state, action) =>
  update(state, {
    signup: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
    }
  });
const handleSignupError = (state, action) =>
  update(state, {
    signup: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload }
    }
  });
// const handleSignupReset = (state, action) =>
//   update(state, { $merge: initialState });
const handleForgotPssswordRequest = (state, action) =>
  update(state, {
    forgotPassword: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });

const handleForgotPasswordSuccess = (state, action) =>
  update(state, {
    forgotPassword: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
    }
  });

const handleForgotPasswordError = (state, action) =>
  update(state, {
    forgotPassword: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

const handleUserDataRequest = (state, action) =>
  update(state, {
    userdata: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" }
    }
  });
const handleUserDataSuccess = (state, action) =>
  update(state, {
    userdata: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload }
    }
  });
const handleUserDataError = (state, action) =>
  update(state, {
    userdata: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload }
    }
  });
const handleLogout = (state, action) =>
  update(state, {
    userdata: {
      data: { $set: "" }
    }
  });

const handleUpdateUserRequest = (state, action) =>
  update(state, {
    profileInfoUpdate: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleUpdateUserSuccess = (state, action) =>
  update(state, {
    profileInfoUpdate: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
    }
  });
const handleUpdateUserError = (state, action) =>
  update(state, {
    profileInfoUpdate: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

const handleUpdatePasswordRequest = (state, action) =>
  update(state, {
    passwordUpdate: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleUpdatePasswordSuccess = (state, action) =>
  update(state, {
    passwordUpdate: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
    }
  });
const handleUpdatePasswordError = (state, action) =>
  update(state, {
    passwordUpdate: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

const handleAddInterestRequest = (state, action) =>
  update(state, {
    addInterest: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" }
    }
  });
const handleAddInterestSuccess = (state, action) =>
  update(state, {
    addInterest: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload }
    }
  });

// const handleAddInterestSuccess = (state, action) => {
//   const { data: userdata } = action.payload.userdata;
// if (action.payload.pathname === "/wishlist") {
//   const event = state.wishlist.data.data.results.find(
//     event => action.payload.id === event._id
//   );
//   const eventIndex = state.wishlist.data.data.results.indexOf(event);

//   if (eventIndex >= 0) {
//     const iInterested = event.interested.find(
//       oneInterested => userdata._id === oneInterested._id
//     );
//     const iInterestedIndex = event.interested.indexOf(iInterested);

//     if (iInterestedIndex >= 0) {
//       return update(state, {
//         interested: {
//           isLoading: { $set: false },
//           isSuccess: { $set: true },
//           isError: { $set: false }
//         },
//         wishlist: {
//           data: {
//             data: {
//               results: {
//                 [eventIndex]: {
//                   interested: { $splice: [[iInterestedIndex, 1]] }
//                 }
//               }
//             }
//           }
//         }
//       });
//     } else {
//       return update(state, {
//         interested: {
//           isLoading: { $set: false },
//           isSuccess: { $set: true },
//           isError: { $set: false }
//         },
//         wishlist: {
//           data: {
//             data: {
//               results: {
//                 [eventIndex]: { interested: { $push: [userdata] } }
//               }
//             }
//           }
//         }
//       });
//     }
//   }
// } else if (action.payload.pathname.includes("event-detail")) {
//   return update(state, {
//     interested: {
//       isLoading: { $set: false },
//       isSuccess: { $set: true },
//       isError: { $set: false }
//     }
//   });
// } else if (action.payload.pathname === "/calendarview") {
//   if (state.calendarEvents.data) {
//     const event_data = state.calendarEvents.data.data.find(
//       event => action.payload.id === event._id
//     );
//     const event_data_index = state.calendarEvents.data.data.indexOf(
//       event_data
//     );
//     if (event_data_index >= 0) {
//       const iInterested = event_data.interested.find(
//         oneInterested => userdata._id === oneInterested._id
//       );
//       const iInterestedIndex = event_data.interested.indexOf(iInterested);
//       if (iInterestedIndex >= 0) {
//         return update(state, {
//           calendarEvents: {
//             data: {
//               data: {
//                 [event_data_index]: {
//                   interested: { $splice: [[iInterestedIndex, 1]] }
//                 }
//               }
//             },
//             isLoading: { $set: false },
//             isSuccess: { $set: true },
//             isError: { $set: false }
//           }
//         });
//       } else {
//         return update(state, {
//           interested: {
//             isLoading: { $set: false },
//             isSuccess: { $set: true },
//             isError: { $set: false }
//           },
//           calendarEvents: {
//             data: {
//               data: {
//                 [event_data_index]: { interested: { $push: [userdata] } }
//               }
//             }
//           }
//         });
//       }
//     }
//   }
// } else if (action.payload.pathname === "/") {
//   return update(state, {
//     interested: {
//       isLoading: { $set: false },
//       isSuccess: { $set: true },
//       isError: { $set: false }
//     }
//   });
// } else
//   {
//     const event = state.eventsByCategory.events.find(
//       event => action.payload.id === event._id
//     );
//     const eventIndex = state.eventsByCategory.events.indexOf(event);

//     if (eventIndex >= 0) {
//       const iInterested = event.interested.find(
//         oneInterested => userdata._id === oneInterested._id
//       );
//       const iInterestedIndex = event.interested.indexOf(iInterested);

//       if (iInterestedIndex >= 0) {
//         return update(state, {
//           interested: {
//             isLoading: { $set: false },
//             isSuccess: { $set: true },
//             isError: { $set: false }
//           },
//           eventsByCategory: {
//             events: {
//               [eventIndex]: { interested: { $splice: [[iInterestedIndex, 1]] } }
//             }
//           }
//         });
//       } else {
//         return update(state, {
//           interested: {
//             isLoading: { $set: false },
//             isSuccess: { $set: true },
//             isError: { $set: false }
//           },
//           eventsByCategory: {
//             events: { [eventIndex]: { interested: { $push: [userdata] } } }
//           }
//         });
//       }
//     }
//   }
// };

const handleAddInterestError = (state, action) =>
  update(state, {
    addInterest: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload }
    }
  });

const handleContactUsRequest = (state, action) =>
  update(state, {
    contactUs: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleContactUsSuccess = (state, action) =>
  update(state, {
    contactUs: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
    }
  });
const handleContactUsError = (state, action) =>
  update(state, {
    contactUs: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

  const socialLoginRequest = (state, action) =>
  update(state, {
    socialLogin: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const socialLoginSuccess = (state, action) =>
  update(state, {
    socialLogin: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
    }
  });
const socialLoginError = (state, action) =>
  update(state, {
    socialLogin: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });


export default handleActions(
  {
    [constants.LOGIN_REQUEST]: handleLoginRequest,
    [constants.LOGIN_SUCCESS]: handleLoginSuccess,
    [constants.LOGIN_ERROR]: handleLoginError,
    // [constants.LOGIN_RESET]: handleLoginReset,
    [constants.LOGOUT]: handleLogout,
    [constants.SIGNUP_REQUEST]: handleSignupRequest,
    [constants.SIGNUP_SUCCESS]: handleSignupSuccess,
    [constants.SIGNUP_ERROR]: handleSignupError,

    [constants.SOCIAL_LOGIN_REQEST]: socialLoginRequest,
    [constants.SOCIAL_LOGIN_SUCCESS]: socialLoginSuccess,
    [constants.SOCIAL_LOGIN_ERROR]: socialLoginError,
    // [constants.SIGNUP_RESET]: handleSignupReset,

    [constants.FORGOT_PASSWORD_REQUEST]: handleForgotPssswordRequest,
    [constants.FORGOT_PASSWORD_SUCCESS]: handleForgotPasswordSuccess,
    [constants.FORGOT_PASSWORD_ERROR]: handleForgotPasswordError,

    [constants.GET_USER_DATA_REQUEST]: handleUserDataRequest,
    [constants.GET_USER_DATA_SUCCESS]: handleUserDataSuccess,
    [constants.GET_USER_DATA_ERROR]: handleUserDataError,
    [constants.SOCIAL_LOGIN_REQUEST]: handleSocialLoginRequest,
    [constants.SOCIAL_LOGIN_SUCCESS]: handleSocialLoginSuccess,
    [constants.SOCIAL_LOGIN_ERROR]: handleSocialLoginError,

    [constants.UPDATE_USER_REQUEST]: handleUpdateUserRequest,
    [constants.UPDATE_USER_SUCCESS]: handleUpdateUserSuccess,
    [constants.UPDATE_USER_ERROR]: handleUpdateUserError,

    [constants.UPDATE_PASSWORD_REQUEST]: handleUpdatePasswordRequest,
    [constants.UPDATE_PASSWORD_SUCCESS]: handleUpdatePasswordSuccess,
    [constants.UPDATE_PASSWORD_ERROR]: handleUpdatePasswordError,

    [constants.CONTACT_US_REQUEST]: handleContactUsRequest,
    [constants.CONTACT_US_SUCCESS]: handleContactUsSuccess,
    [constants.CONTACT_US_ERROR]: handleContactUsError,

    [constants.ADD_INTEREST_REQUEST]: handleAddInterestRequest,
    [constants.ADD_INTEREST_SUCCESS]: handleAddInterestSuccess,
    [constants.ADD_INTEREST_ERROR]: handleAddInterestError
  },
  initialState
);
