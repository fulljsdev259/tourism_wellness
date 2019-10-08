import * as actions from "../actions";
import { call, put, select } from "redux-saga/effects";
import fireApi from "../../services/fireApi";
import { localStore } from "../../services/storage";
import { toast } from "react-toastify";

export function* getCategoriesRequest(action) {
  try {
    const response = yield call(fireApi, "GET", "getCategory");
    if (response) {
      yield put(actions.getCategoriesSuccess(response.data));
    } else {
      yield put(actions.getCategoriesError());
    }
  } catch (e) {
    yield put(actions.getCategoriesError());
  }
}

export function* getLocationsRequest(action) {
  try {
    const response = yield call(fireApi, "GET", "getLocations");
    if (response) {
      yield put(actions.getLocationsSuccess(response.data));
    } else {
      yield put(actions.getLocationsError());
    }
  } catch (e) {
    yield put(actions.getLocationsError());
  }
}

export function* addEventRequest(action) {
  try {
    const response = yield call(fireApi, "POST", `addEvent`, action.payload);    
    if (response && response.data && response.data._id) {      
      toast.success("Details saved successfully");
      yield put(actions.submitEventSuccess(response.data));
      // yield put(actions.getUserPostByIdRequest(action.payload.user_id));
    } else {
      if (response.data && response.data.message && response.data.message.includes("duplicate key")) {
        toast.error("User is already registered, login to add commpany");        
        yield put(actions.submitEventError({ duplicate: true }));
      }
    }
  } catch (e) {
    // yield put(actions.submitEventError());
  }
}


export function* getEventsByCategoryRequest(action) {
  try {
    const { page_number, id, eventState, eventCity } = action.payload;
    const ageFlag = "all";
    const response = yield call(
      fireApi,
      "GET",
      `events?categories=${id}&page=${page_number}${
        ageFlag === "all" ? "" : "&contentType=" + ageFlag
      }${eventState && "&EventState=" + eventState}${eventCity &&
        "&EventCity=" + eventCity}`
    );
    if (response) {
      yield put(
        actions.getEventsByCategorySuccess({
          page_number:  (page_number ? page_number +1 : 2),
          ...response.data
        })
      );
    } else {
      yield put(actions.getEventsByCategoryError());
    }
  } catch (e) {
    yield put(actions.getEventsByCategoryError());
  }
}

export function* getUserPostByIdRequest(action) {
  try {
    const response = yield call(
      fireApi,
      "GET",
      `events/getUserPostById/${action.payload}`
    );
    if (response) {
      yield put(actions.getUserPostByIdSuccess(response.data));
    } else {
      yield put(actions.getUserPostByIdError());
    }
  } catch (e) {
    yield put(actions.getUserPostByIdError());
  }
}

export function* getEventByIdRequest(action) {
  try {
    const response = yield call(fireApi, "GET", `getEvent/${action.payload}`);
    if (response) {
      yield put(actions.getEventByIdSuccess(response.data));
    } else {
      yield put(actions.getEventByIdError());
    }
  } catch (e) {
    yield put(actions.getEventByIdError());
  }
}

export function* deleteEventRequest(action) {
  const header = {
    Authorization: localStore("token")
  };
  const { eventId, userId } = action.payload;
  try {
    const response = yield call(
      fireApi,
      "DELETE",
      `deleteEvent/${eventId}`,
      null,
      header
    );
    console.log(fireApi,'response-----');
    if (response.data.success) {
      toast.success("Company deleted successfully");
      yield put(actions.deleteEventSuccess(response.data));
      yield put(actions.getUserPostByIdRequest(userId));
    } else {
      yield put(actions.deleteEventError());
    }
  } catch (e) {
    yield put(actions.deleteEventError());
  }
}

export function* addReviewRequest(action) {
  const header = {
    Authorization: localStore("token")
  };
  try {
    const response = yield call(
      fireApi,
      "POST",
      `events/addReview/${action.payload.event_id}`,
      action.payload.values,
      header
    );
    if (response) {
      toast.success("Your review posted successfully");
      yield put(actions.addReviewSuccess(response.data));
      yield put(actions.getEventByIdRequest(action.payload.event_id));
    } else {
      toast.error(response.data);
      yield put(actions.addReviewError());
    }
  } catch (e) {
    yield put(actions.addReviewError());
  }
}

export function* addInterestRequest(action) {
  const header = {
    Authorization: localStore("token")
  };
  try {
    const response = yield call(
      fireApi,
      "PUT",
      `events/addInterest/${action.payload.event_id}`,
      null,
      header
    );
    if (response && response.data.success) {
      const userdata = yield select(state => state.auth.userdata.data);
      yield put(
        actions.addInterestSuccess({
          ...response.data,
          userdata,
          id: action.payload.event_id
          // pathname: action.payload.pathname
        })
      );
      // yield pit(actions.getInterestedEventsRequest())
      yield put(actions.getEventByIdRequest(action.payload.event_id));
      yield put(actions.getEventsByCategoryRequest(action.payload));
    } else {
      yield put(actions.addInterestError());
    }
  } catch (e) {
    yield put(actions.addInterestError());
  }
}
// export function* addInterestRequest(action) {
//   const header = {
//     Authorization: localStore("token")
//   };

//   try {
//     const response = yield call(
//       fireApi,
//       "PUT",
//       `events/addInterest/${action.payload}`,
//       null,
//       header
//     );
//     console.log(response.data, "response.data");
//     if (response && response.data.success) {
//       const userdata = yield select(state => state.auth.userdata.data);
//       yield put(
//         actions.addInterestSuccess({
//           ...response.data,
//           userdata,
//           id: action.payload._id,
//           pathname: action.payload.pathname
//         })
//       );
//       // yield put(actions.getInterestedEventsRequest());
//       if (action.payload.pathname.includes("event-detail")) {
//         yield put(actions.getEventByIdRequest(action.payload._id));
//       }
//       // if (action.payload.pathname === "/") {
//       //   yield put(actions.getFeaturedEventsRequest());
//       // }
//     } else {
//       yield put(actions.addInterestError());
//     }
//   } catch (e) {
//     yield put(actions.addInterestError());
//   }
// }

export function* getFeaturedEventsRequest(action) {
  // const header = {
  //   Authorization: localStore("token")
  // };
  // const { cat_id, state_id } = action.payload;
  try {
    const response = yield call(
      fireApi,
      "GET",
      `getFeatured?${action.payload ? "EventState=" + action.payload : ""}`,
      null
      // header
    );
    if (response) {
      yield put(actions.getFeaturedEventsSuccess(response.data));
    } else {
      yield put(actions.getFeaturedEventsError());
    }
  } catch (e) {
    yield put(actions.getFeaturedEventsError());
  }
}

export function* getInterestRequest(action) {
  const header = {
    Authorization: localStore("token")
  };
  try {
    const response = yield call(
      fireApi,
      "GET",
      `getInterestedEvents`,
      null,
      header
    );
    if (response.data.success) {
      // console.log(response.data);
      
      yield put(actions.getInterestSuccess(response.data));
    } 
  } catch (e) {
    yield put(actions.getInterestError());
  }
}

export function* updateEventRequest(action) {
  const header = {
    Authorization: localStore("token")
  };
  try {
    const response = yield call(
      fireApi,
      "PUT",
      `updateEvent/${action.payload.id}`,
      action.payload.data,
      header
    );
    if (
      response.data.success
      
      //  && response.data && response.data.userSignUpMessage
    ) {
      
      toast.success("Information updated successfully!");
      yield put(actions.updateEventSuccess(response.data));
      yield put(actions.getUserPostByIdRequest(action.payload.user_id));
    } else {
      // if (response.data.message) {
      //   // toast.error("Email already exists");
      yield put(actions.updateEventError({ duplicate: true }));
      // /}
    }
  } catch (e) {
    yield put(actions.updateEventError());
  }
}
