import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import studentReducer from "../Reducer/StudentReducer";
import questionReducer from "../Reducer/Questionreducer";

const rootReducer = combineReducers({
  studentDetails: studentReducer,
  questionList: questionReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
