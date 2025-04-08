// src/redux/store.js
import { createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";
// Correct path (you are already in redux/Store)
import studentReducer from "../Reducer/StudentReducer"

const rootReducer = combineReducers({
  student: studentReducer,
  // Add other reducers here
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
