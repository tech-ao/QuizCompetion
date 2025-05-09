const initialState = { questions: [], loading: false, error: null };

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_QUESTIONS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_QUESTIONS_SUCCESS":
      return { ...state, loading: false, questions: action.payload };
    case "FETCH_QUESTIONS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_QUESTION_REQUEST":
      return { ...state, loading: true };
    case "FETCH_QUESTION_SUCCESS":
      return { ...state, loading: false, selectedStudent: action.payload };
    case "FETCH_QUESTION_FAILURE":
      return { ...state, loading: false, error: action.payload };
  
    default:
      return state;
  }
};

export default questionReducer;
