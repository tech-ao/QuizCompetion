import { type } from "@testing-library/user-event/dist/type";
import { fetchQuestions , getQuestion } from "../Services/QuestionService";

export const getQuestions = (paginationDetail) => async (dispatch) => {
  dispatch({ type: "FETCH_QUESTIONS_REQUEST" });
  try {
    const questions = await fetchQuestions(paginationDetail );
    dispatch({ type: "FETCH_QUESTIONS_SUCCESS", payload: questions });
  } catch (error) {
    dispatch({ type: "FETCH_QUESTIONS_FAILURE", payload: error.message });
  }
};



export const fetchQuestion = (questionId)=>async (dispatch)=>{
  console.log(questionId);
  
  dispatch({type:"FETCH_QUESTION_REQUEST"});
  try{
    const question = await getQuestion(questionId);
    dispatch ({type:"FETCH_QUESTION_SUCCESS", payload: question})
   
  }catch(error){
    dispatch({type:"FETCH_QUESTION_FAILURE" , payload:error.message})
  }
}


