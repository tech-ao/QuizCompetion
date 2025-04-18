const initialState = {
  students: [],
  selectedStudent: null,
  loading: false,
  error: null,
};

const StudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_STUDENT_REQUEST":
    case "FETCH_STUDENT_REQUEST":
      return { ...state, loading: true, error: null };

    case "ADD_STUDENT_SUCCESS":
      return {
        ...state,
        loading: false,
        students: [action.payload, ...state.students],
      };

    case "FETCH_STUDENT_SUCCESS":
      return {
        ...state,
        loading: false,
        selectedStudent: action.payload,
      };

    case "ADD_STUDENT_FAILURE":
    case "FETCH_STUDENT_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default StudentReducer;
