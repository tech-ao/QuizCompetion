import { type } from "@testing-library/user-event/dist/type";
import {  addStudent} from "../Services/StudentService";


export const addStudentAction = (studentData , paginationDetail) => async (dispatch) => {
    console.log(studentData);
    
    dispatch({ type: "ADD_STUDENT_REQUEST" });
    try {
      const addedStudent = await addStudent(studentData); // Call the API
      dispatch({ type: "ADD_STUDENT_SUCCESS", payload: addedStudent }); 
      return addedStudent;
    } catch (error) {
      dispatch({ type: "ADD_STUDENT_FAILURE", payload: error.message }); // Dispatch failure
    }
  };