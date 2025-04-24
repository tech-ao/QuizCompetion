import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../../../redux/Action/QuestionAction";

import "bootstrap/dist/css/bootstrap.min.css";

const Questions = () => {
  const [timer, setTimer] = useState(600);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [realTime, setRealTime] = useState("");
  const [currentNumber, setCurrentNumber] = useState(null);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const questionState = useSelector((state) => state.questionList);


  useEffect(() => {
    dispatch(getQuestions({ level: 1, pagination: { pageSize: 15, pageNumber: 1 } }));
  }, [dispatch]);

  useEffect(() => {
    if (questionState.questions?.data?.questions) {
      const fetchedQuestions = questionState.questions.data.questions;
      const shuffledQuestions = fetchedQuestions.sort(() => 0.5 - Math.random());
      setQuestions(shuffledQuestions.slice(0, 10));
    }
  }, [questionState]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const studentId = localStorage.getItem("studentId");



  const { loading, error, selectedStudent: selectedStudent } = useSelector(
    (state) => state.studentDetails
  );


  const student = selectedStudent?.data


  useEffect(() => {
    const updateClock = setInterval(() => {
      const now = new Date();
      setRealTime(
        `${now.getHours().toString().padStart(2, "0")}:${now
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
      );
    }, 1000);
    return () => clearInterval(updateClock);
  }, []);

  useEffect(() => {
    setIsInputVisible(false);
    setCurrentNumber(null);

    const currentQ = questions[currentQuestionIndex];
    if (!currentQ || !currentQ.numbers || !Array.isArray(currentQ.numbers)) {
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index < currentQ.numbers.length) {
        setCurrentNumber(currentQ.numbers[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsInputVisible(true);
        setShowNextButton(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex, questions]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      navigate("/mental-submit");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowNextButton(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex === 0) {
      navigate("/mental-test");
    } else {
      setCurrentQuestionIndex((prev) => prev - 1);
      setShowNextButton(false);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      {/* Header Section */}
      <div className="mental-ques-1-container py-0">
        <div className="row justify-content-between align-items-center mb-4 p-3 header-gradient text-white rounded">
          <div className="col-12 col-lg-8 d-flex gap-4">
            <div className="w-50 mb-2">
              <label htmlFor="name">Name:</label>
              <input id="name" type="text" value={student.firstName} className="form-control border-0 border-bottom mt-2" />
            </div>
            <div className="w-50 mb-2">
              <label htmlFor="level">Level:</label>
              <input id="level" type="text" value={student.gradeName} className="form-control border-0 border-bottom mt-2" />
            </div>
          </div>
          <div className="col-12 col-lg-3 text-center fs-4">Real Time: {realTime}</div>
        </div>
      

      {/* Quiz Section */}
      <div className="quiz-app container py-4" style={{ maxWidth: "1200px" }}>
        {currentQuestion && (
          <div className="question-section">
            <div className="question-header d-flex justify-content-between align-items-center bg-light p-3 rounded mb-4">
              <span>Qn. No: {currentQuestion.no}</span>
              <span>Time: {formatTime(timer)}</span>
            </div>
            <div className="question-body text-center mb-4">
              <p>{currentQuestion.questions}</p>
              <h1>{currentNumber}</h1>
            </div>
            {isInputVisible && (
              <div className="navigation d-flex justify-content-between align-items-center">
                <button className="btn btn-primary" onClick={handlePrevious}>Previous</button>
                <input type="text" className="form-control mx-3 w-50" placeholder="Answer" />
                {showNextButton && (
                  <button className="btn btn-success" onClick={handleNext}>Next</button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Questions;
