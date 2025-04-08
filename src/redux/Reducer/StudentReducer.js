const initialState = { students: [], loading: false, error: null };

const StudentReducer = (state = initialState, action) => {
  switch (action.type) {
   
    case "ADD_STUDENT_REQUEST":
      return { ...state, loading: true, };
    case "ADD_STUDENT_SUCCESS": 
      return { ...state, loading: false, students: [ action.payload ,...state.students], };
    case "ADD_STUDENT_FAILURE":
      return { ...state, loading: false, error: action.payload, };  
    default:
      return state;
  }
};

export default StudentReducer;
