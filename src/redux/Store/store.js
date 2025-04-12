// src/redux/store.js
import { createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";
// Correct path (you are already in redux/Store)
import studentReducer from "../Reducer/StudentReducer"
import questionReducer from "../Reducer/Questionreducer";

const rootReducer = combineReducers({
  student: studentReducer,
  questionList:questionReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
