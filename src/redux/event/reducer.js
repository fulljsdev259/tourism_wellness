import { handleActions } from "redux-actions";
import update from "immutability-helper";
import constants from "../constants";

const initialState = {
  calendarEvents: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: ""
  },
  categories: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: ""
  },
  eventsByCategory: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: "",
    events: [],
    page_number: 1
  },
  selectedState: "",
  selectedCity: "",
  ageFlag: "all",
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  storableLocation: "",
  locations: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: ""
  },
  eventById: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: ""
  },
  postById: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: ""
  },
  interested: {
    isLoading: false,
    isSuccess: false,
    isError: false
  },
  wishlist: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: ""
  },
  featuredEvents: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: ""
  },
  addReview: {
    isLoading: false,
    isSuccess: false,
    isError: false
  },
  searchedEvents: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: "",
    isFieldFocused: false
  },
  sharePost: "",
  submitevent: {
    isLoading: false,
    isSuccess: false,
    isError: false
  },
  updateEvent: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    duplicate_email: false,
    data: [],
  },
  deleteEvent: {
    isLoading: false,
    isSuccess: false,
    isError: false
  },
  wishLists:{
    isLoading: false,
    isSuccess: false,
    isError: false,
    data:[]
  },
};

const handleMonthlyEventsRequest = (state, action) =>
  update(state, {
    calendarEvents: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" }
    }
  });
const handleMonthlyEventsSuccess = (state, action) =>
  update(state, {
    calendarEvents: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload }
    }
  });
const handleMonthlyEventsError = (state, action) =>
  update(state, {
    calendarEvents: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload }
    }
  });

const handleCategoriesRequest = (state, action) =>
  update(state, {
    categories: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" }
    }
  });
const handleCategoriesSuccess = (state, action) =>
  update(state, {
    categories: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload }
    }
  });
const handleCategoriesError = (state, action) =>
  update(state, {
    categories: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload }
    }
  });

const handleEventsByCategoryRequest = (state, action) =>
  update(state, {
    eventsByCategory: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" }
    }
  });
const handleEventsByCategorySuccess = (state, action) => {
  if (action.payload.page_number === 2) {
    return update(state, {
      eventsByCategory: {
        isLoading: { $set: false },
        isSuccess: { $set: true },
        isError: { $set: false },
        data: { $set: action.payload },
        events: { $set: action.payload.data.results },
        page_number: { $set: action.payload.page_number }
      }
    });
  } else {
    return update(state, {
      eventsByCategory: {
        isLoading: { $set: false },
        isSuccess: { $set: true },
        isError: { $set: false },
        data: { $set: action.payload },
        events: { $push: [...action.payload.data.results] },
        page_number: { $set: action.payload.page_number }
      }
    });
  }
};
const handleEventsByCategoryError = (state, action) =>
  update(state, {
    eventsByCategory: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload }
    }
  });

const handleLocationsRequest = (state, action) =>
  update(state, {
    locations: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" }
    }
  });
const handleLocationsSuccess = (state, action) =>
  update(state, {
    // selectedState: { $set: action.payload.data[0]._id },
    // selectedCity: {
    // $set: action.payload.data[0].cities.length
    // ? action.payload.data[0].cities[0]._id
    // : ""
    // },
    locations: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload }
    }
  });
const handleLocationsError = (state, action) =>
  update(state, {
    locations: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload }
    }
  });

const handleEventByIdRequest = (state, action) =>
  update(state, {
    eventById: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" },
      data: { $set: "" } 
    }
  });
const handleEventByIdSuccess = (state, action) =>
  update(state, {
    eventById: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload }
    }
  });
const handleEventByIdError = (state, action) =>
  update(state, {
    eventById: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload }
    }
  });

const handlesharePost = (state, action) =>
  update(state, {
    sharePost: { $set: action.payload }
  });

const handleInterestRequest = (state, action) =>
  update(state, {
    interested: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleInterestSuccess = (state, action) =>
  update(state, {
    interested: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload }
    }
  });

  const handleUserPostByIdRequest = (state, action) =>
  update(state, {
    postById: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" }
    }
  });
const handleUserPostByIdSuccess = (state, action) =>
  update(state, {
    postById: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload }
    }
  });
const handleUserPostByIdError = (state, action) =>
  update(state, {
    postById: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload }
    }
  });

// const handleInterestSuccess = (state, action) => {
//   const { data: userdata } = action.payload.userdata;
//   if (action.payload.pathname === "/wishlist") {
//     const event = state.wishlist.data.data.results.find(
//       event => action.payload.id === event._id
//     );
//     const eventIndex = state.wishlist.data.data.results.indexOf(event);

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
//           wishlist: {
//             data: {
//               data: {
//                 results: {
//                   [eventIndex]: {
//                     interested: { $splice: [[iInterestedIndex, 1]] }
//                   }
//                 }
//               }
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
//           wishlist: {
//             data: {
//               data: {
//                 results: {
//                   [eventIndex]: { interested: { $push: [userdata] } }
//                 }
//               }
//             }
//           }
//         });
//       }
//     }
//   } else if (action.payload.pathname.includes("event-detail")) {
//     return update(state, {
//       interested: {
//         isLoading: { $set: false },
//         isSuccess: { $set: true },
//         isError: { $set: false }
//       }
//     });
//   } else if (action.payload.pathname === "/calendarview") {
//     if (state.calendarEvents.data) {
//       const event_data = state.calendarEvents.data.data.find(
//         event => action.payload.id === event._id
//       );
//       const event_data_index = state.calendarEvents.data.data.indexOf(
//         event_data
//       );
//       if (event_data_index >= 0) {
//         const iInterested = event_data.interested.find(
//           oneInterested => userdata._id === oneInterested._id
//         );
//         const iInterestedIndex = event_data.interested.indexOf(iInterested);
//         if (iInterestedIndex >= 0) {
//           return update(state, {
//             calendarEvents: {
//               data: {
//                 data: {
//                   [event_data_index]: {
//                     interested: { $splice: [[iInterestedIndex, 1]] }
//                   }
//                 }
//               },
//               isLoading: { $set: false },
//               isSuccess: { $set: true },
//               isError: { $set: false }
//             }
//           });
//         } else {
//           return update(state, {
//             interested: {
//               isLoading: { $set: false },
//               isSuccess: { $set: true },
//               isError: { $set: false }
//             },
//             calendarEvents: {
//               data: {
//                 data: {
//                   [event_data_index]: { interested: { $push: [userdata] } }
//                 }
//               }
//             }
//           });
//         }
//       }
//     }
//   } else if (action.payload.pathname === "/") {
//     return update(state, {
//       interested: {
//         isLoading: { $set: false },
//         isSuccess: { $set: true },
//         isError: { $set: false }
//       }
//     });
//   } else {
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
const handleInterestError = (state, action) =>
  update(state, {
    interested: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

// const handleInterestedEventsRequest = (state, action) =>
//   update(state, {
//     wishlist: {
//       isLoading: { $set: true },
//       isSuccess: { $set: false },
//       isError: { $set: false },
//       message: { $set: "" }
//     }
//   });
// const handleInterestedEventsSuccess = (state, action) =>
//   update(state, {
//     wishlist: {
//       isLoading: { $set: false },
//       isSuccess: { $set: true },
//       isError: { $set: false },
//       data: { $set: action.payload }
//     }
//   });
// const handleInterestedEventsError = (state, action) =>
//   update(state, {
//     wishlist: {
//       isLoading: { $set: false },
//       isSuccess: { $set: false },
//       isError: { $set: true },
//       message: { $set: action.payload }
//     }
//   });

const handleFeaturedEventsRequest = (state, action) =>
  update(state, {
    featuredEvents: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" }
    }
  });
const handleFeaturedEventsSuccess = (state, action) =>
  update(state, {
    featuredEvents: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload }
    }
  });
const handleFeaturedEventsError = (state, action) =>
  update(state, {
    featuredEvents: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload }
    }
  });

const handleSearchEventsRequest = (state, action) =>
  update(state, {
    searchedEvents: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" }
    }
  });
const handleSearchEventsSuccess = (state, action) =>
  update(state, {
    searchedEvents: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload }
    }
  });
const handleSearchEventsError = (state, action) =>
  update(state, {
    searchedEvents: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload }
    }
  });

const handleSearchFocus = (state, action) =>
  update(state, {
    searchedEvents: {
      isFieldFocused: { $set: true }
    }
  });

const handleSearchBlur = (state, action) =>
  update(state, {
    searchedEvents: {
      isFieldFocused: { $set: false }
    }
  });

const handleAgeFlagChange = (state, action) =>
  update(state, {
    ageFlag: { $set: action.payload }
  });

const handleStateChange = (state, action) => {
  const stateData = state.locations.data.data.find(
    state => action.payload === state._id
  );
  if (stateData && stateData.cities && stateData.cities.length) {
    return update(state, {
      selectedState: { $set: action.payload },
      selectedCity: { $set: stateData.cities[0]._id }
    });
  } else {
    return update(state, {
      selectedState: { $set: action.payload },
      selectedCity: { $set: "" }
    });
  }
};

const handleCityChange = (state, action) =>
  update(state, {
    selectedCity: { $set: action.payload }
  });

const handleMonthYearChange = (state, action) =>
  update(state, {
    month: { $set: action.payload.month },
    year: { $set: action.payload.year }
  });

const handleAddReviewRequest = (state, action) =>
  update(state, {
    addReview: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleAddReviewSuccess = (state, action) =>
  update(state, {
    addReview: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload }
    }
  });
const handleAddReviewError = (state, action) =>
  update(state, {
    addReview: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload }
    }
  });

const handleStorableLocation = (state, action) =>
  update(state, {
    storableLocation: { $set: action.payload }
  });

const handleClearListOnUnmount = (state, action) =>
  update(state, {
    eventsByCategory: { data: { $set: "" }, events: { $set: [] } }
  });

const handleLogout = (state, action) =>
  update(state, {
    wishlist: {
      data: { $set: "" }
    }
  });

const handleSubmitEventRequest = (state, action) =>
  update(state, {
    submitevent: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" }
    }
  });
const handleSubmitEventSuccess = (state, action) =>
  update(state, {
    submitevent: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload }
    }
  });
const handleSubmitEventError = (state, action) =>
  update(state, {
    submitevent: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload }
    }
  });
const handleSubmitEventReset = (state, action) =>
  update(state, {
    submitevent: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" }
    }
  });

  const handleDeleteEventRequest = (state, action) =>
  update(state, {
    deleteEvent: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" }
    }
  });
const handleDeleteEventSuccess = (state, action) =>
  update(state, {
    deleteEvent: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
    }
  });
const handleDeleteEventError = (state, action) =>
  update(state, {
    deleteEvent: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload }
    }
  });

  const getInterestRequest = (state, action) =>
  update(state, {
    wishLists: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" }
    }
  });
const getInterestSuccess = (state, action) =>{
  
  return update(state, {
    wishLists: {
      data:{ $set:action.payload.data.results },
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
    }
  })
}
const getInterestError = (state, action) =>
  update(state, {
    wishLists: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload }
    }
  });

  const handleUpdateEventRequest = (state, action) =>
  update(state, {
    updateEvent: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" }
    }
  });
const handleUpdateEventSuccess = (state, action) =>
  update(state, {
    updateEvent: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload }
    }
  });
const handleUpdateEventError = (state, action) =>
  update(state, {
    updateEvent: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload },
      duplicate_email: { $set: action.payload.duplicate }
    }
  });

export default handleActions(
  {
    [constants.LOGOUT]: handleLogout,
    [constants.GET_MONTHLY_EVENTS_REQUEST]: handleMonthlyEventsRequest,
    [constants.GET_MONTHLY_EVENTS_SUCCESS]: handleMonthlyEventsSuccess,
    [constants.GET_MONTHLY_EVENTS_ERROR]: handleMonthlyEventsError,

    [constants.GET_CATEGORIES_REQUEST]: handleCategoriesRequest,
    [constants.GET_CATEGORIES_SUCCESS]: handleCategoriesSuccess,
    [constants.GET_CATEGORIES_ERROR]: handleCategoriesError,

    [constants.GET_EVENTS_BY_CATEGORY_REQUEST]: handleEventsByCategoryRequest,
    [constants.GET_EVENTS_BY_CATEGORY_SUCCESS]: handleEventsByCategorySuccess,
    [constants.GET_EVENTS_BY_CATEGORY_ERROR]: handleEventsByCategoryError,

    [constants.GET_LOCATIONS_REQUEST]: handleLocationsRequest,
    [constants.GET_LOCATIONS_SUCCESS]: handleLocationsSuccess,
    [constants.GET_LOCATIONS_ERROR]: handleLocationsError,

    [constants.GET_EVENT_BY_ID_REQUEST]: handleEventByIdRequest,
    [constants.GET_EVENT_BY_ID_SUCCESS]: handleEventByIdSuccess,
    [constants.GET_EVENT_BY_ID_ERROR]: handleEventByIdError,
    
    [constants.SHARE_POST]: handlesharePost,

    [constants.ADD_INTEREST_REQUEST]: handleInterestRequest,
    [constants.ADD_INTEREST_SUCCESS]: handleInterestSuccess,
    [constants.ADD_INTEREST_ERROR]: handleInterestError,

    // [constants.GET_INTERESTED_EVENTS_REQUEST]: handleInterestedEventsRequest,
    // [constants.GET_INTERESTED_EVENTS_SUCCESS]: handleInterestedEventsSuccess,
    // [constants.GET_INTERESTED_EVENTS_ERROR]: handleInterestedEventsError,

    [constants.GET_FEATURED_EVENTS_REQUEST]: handleFeaturedEventsRequest,
    [constants.GET_FEATURED_EVENTS_SUCCESS]: handleFeaturedEventsSuccess,
    [constants.GET_FEATURED_EVENTS_ERROR]: handleFeaturedEventsError,

    [constants.SEARCH_EVENTS_REQUEST]: handleSearchEventsRequest,
    [constants.SEARCH_EVENTS_SUCCESS]: handleSearchEventsSuccess,
    [constants.SEARCH_EVENTS_ERROR]: handleSearchEventsError,

    [constants.SEARCH_FOCUS]: handleSearchFocus,
    [constants.SEARCH_BLUR]: handleSearchBlur,

    [constants.AGE_FLAG_CHANGE]: handleAgeFlagChange,

    [constants.STATE_CHANGE]: handleStateChange,
    [constants.CITY_CHANGE]: handleCityChange,

    [constants.MONTH_YEAR_CHANGE]: handleMonthYearChange,

    [constants.ADD_REVIEW_REQUEST]: handleAddReviewRequest,
    [constants.ADD_REVIEW_SUCCESS]: handleAddReviewSuccess,
    [constants.ADD_REVIEW_ERROR]: handleAddReviewError,

    [constants.STORABLE_LOCATION]: handleStorableLocation,
    [constants.CLEAR_LIST_ON_UNMOUNT]: handleClearListOnUnmount,

    [constants.SUBMIT_EVENT_REQUEST]: handleSubmitEventRequest,
    [constants.SUBMIT_EVENT_SUCCESS]: handleSubmitEventSuccess,
    [constants.SUBMIT_EVENT_ERROR]: handleSubmitEventError,
    [constants.SUBMIT_EVENT_RESET]: handleSubmitEventReset,

    [constants.DELETE_EVENT_REQUEST]: handleDeleteEventRequest,
    [constants.DELETE_EVENT_SUCCESS]: handleDeleteEventSuccess,
    [constants.DELETE_EVENT_ERROR]: handleDeleteEventError,

    [constants.GET_USER_POST_BY_ID_REQUEST]: handleUserPostByIdRequest,
    [constants.GET_USER_POST_BY_ID_SUCCESS]: handleUserPostByIdSuccess,
    [constants.GET_USER_POST_BY_ID_ERROR]: handleUserPostByIdError,

    [constants.GET_INTEREST_REQUEST]: getInterestRequest,
    [constants.GET_INTEREST_SUCCESS]: getInterestSuccess,
    [constants.GET_INTEREST_ERROR]: getInterestError,

    [constants.UPDATE_EVENT_REQUEST]: handleUpdateEventRequest,
    [constants.UPDATE_EVENT_SUCCESS]: handleUpdateEventSuccess,
    [constants.UPDATE_EVENT_ERROR]: handleUpdateEventError,

  },
  initialState
);
