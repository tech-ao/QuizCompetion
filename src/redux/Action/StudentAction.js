import { addStudent, getStudent } from "../Services/StudentService";

export const addStudentAction = (studentData) => async (dispatch) => {
  dispatch({ type: "ADD_STUDENT_REQUEST" });
  try {
    const addedStudent = await addStudent(studentData);
    dispatch({ type: "ADD_STUDENT_SUCCESS", payload: addedStudent });
    return addedStudent;
  } catch (error) {
    dispatch({ type: "ADD_STUDENT_FAILURE", payload: error.message });
  }
};

export const fetchStudent = (studentId) => async (dispatch) => {
  dispatch({ type: "FETCH_STUDENT_REQUEST" });
  try {
    const student = await getStudent(studentId);
    dispatch({ type: "FETCH_STUDENT_SUCCESS", payload: student });
  } catch (error) {
    dispatch({ type: "FETCH_STUDENT_FAILURE", payload: error.message });
  }
};
