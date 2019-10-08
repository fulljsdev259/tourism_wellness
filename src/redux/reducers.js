import { combineReducers } from "redux";
import auth from "./auth/reducer";
import event from "./event/reducer";
import { reducer as formReducer } from "redux-form";

const appReducer = combineReducers({
  auth,
  event,
  form: formReducer
});

const rootReducer = (state, action) => {
  // if (action.type === "LOGOUT") {
  //   state = undefined;
  // }
  return appReducer(state, action);
};

export default rootReducer;
