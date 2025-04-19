import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getQuestions } from "../../redux/Action/QuestionAction";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Question.css";

const Questions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [timer, setTimer] = useState(600);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [realTime, setRealTime] = useState("");
  const [name, setName] = useState("");
  const [level] = useState(1);
  const [answer, setAnswer] = useState("");
  const [questions, setQuestions] = useState([]);

  const questionState = useSelector((state) => state.questionList);

  const studentId = localStorage.getItem("studentId");

  const { loading, error, selectedStudent: selectedStudent } = useSelector(
    (state) => state.studentDetails
  );


const student = selectedStudent?.data

  // Fetch questions when level changes
  useEffect(() => {
    dispatch(getQuestions({ level: level, pagination: { pageSize: 15, pageNumber: 1 } }));
  }, [dispatch, level]);

  // When API response updates, shuffle and set questions
  useEffect(() => {
    if (questionState.questions?.data?.questions) {
      const fetchedQuestions = questionState.questions.data.questions;
      const shuffledQuestions = fetchedQuestions.sort(() => 0.5 - Math.random());
      setQuestions(shuffledQuestions.slice(0, 10));  // pick first 10
    }
  }, [questionState]);

  // Countdown timer
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  // Real-time clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setRealTime(
        `${now.getHours().toString().padStart(2, "0")}:${now
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
      );
      requestAnimationFrame(updateClock);
    };
    requestAnimationFrame(updateClock);
    return () => cancelAnimationFrame(updateClock);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      navigate("/manual-submit");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnswer(""); // Clear answer on next
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex === 0) {
      navigate("/test-type");
    } else {
      setCurrentQuestionIndex((prev) => prev - 1);
      setAnswer(""); // Clear answer on previous
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      {/* Header Section */}
      <div className="question-container py-0">
        <div className="row justify-content-between align-items-center mb-0 p-1 header-gradient text-white rounded">
          {/* Name and Level Inputs */}
          <div className="col-12 col-lg-8 d-flex gap-4">
            <div className="d-flex flex-column flex-lg-row w-50 mb-2">
              <label className="font-weight-bold mb-2" htmlFor="name">
                Name:
              </label>
              <input
                id="name"
                type="text"
                className="form-control border-0 border-bottom w-100 mt-2 ms-2"
                value={student.firstName}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column flex-lg-row w-50 mb-2">
              <label className="font-weight-bold mb-2" htmlFor="level">
                Level:
              </label>
              <input
                id="level"
                type="text"
                className="form-control border-0 border-bottom w-100 mt-2 ms-2"
                value={student.gradeName}
                readOnly
              />
            </div>
          </div>

          {/* Timer Section */}
          <div className="col-12 col-lg-3 text-center fs-4 font-weight-bold">
            Real Time: {realTime}
          </div>
        </div>
      

      {/* Question Section */}
      <div className="quiz-app  py-4" style={{ width: "100%", maxWidth: "1200px" }}>
        {loading ? (
          <div className="text-center">Loading questions...</div>
        ) : error ? (
          <div className="text-danger text-center">Error loading questions.</div>
        ) : questions.length > 0 ? (
          <div className="question-section">
            <div className="question-header d-flex justify-content-between align-items-center  p-3  mb-1">
              <span>Qn. No: {currentQuestion?.no}</span>
              <span>Time: {formatTime(timer)}</span>
            </div>

            <div className="question-body text-center mb-4">
              {currentQuestion?.questions
                ?.split(",")
                .map((number, index) => (
                  <p className="mb-2" key={index}>{number}</p>
              ))}
            </div>

            <div className="navigation d-flex justify-content-between align-items-center">
              <button className="btn btn-primary" onClick={handlePrevious}>
                Previous
              </button>
              <input
                type="text"
                className="form-control mx-3 w-50"
                placeholder="Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button className="btn btn-success" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">No questions available.</div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Questions;
