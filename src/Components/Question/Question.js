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
  const [level, setLevel] = useState(1);
  const [answer, setAnswer] = useState("");

  const questionState = useSelector((state) => state.questionList);
  const { loading, error } = questionState;

  console.log(questionState);
  

const questions = [ 
    { questionNumber: 1, numberOne: 11, numberTwo: -24, numberThree: 67 },
    { questionNumber: 2, numberOne: 35, numberTwo: 42, numberThree: -15 },
    { questionNumber: 3, numberOne: 7, numberTwo: -9, numberThree: 19 },
    { questionNumber: 4, numberOne: 28, numberTwo: -16, numberThree: 34 },
    { questionNumber: 5, numberOne: 50, numberTwo: 21, numberThree: -13 },
    { questionNumber: 6, numberOne: -12, numberTwo: 8, numberThree: 44 },
    { questionNumber: 7, numberOne: 19, numberTwo: -33, numberThree: 10 },
    { questionNumber: 8, numberOne: 60, numberTwo: -45, numberThree: 25 },
    { questionNumber: 9, numberOne: 14, numberTwo: -6, numberThree: 38 },
    { questionNumber: 10, numberOne: 3, numberTwo: 5, numberThree: -7 },
  ];


console.log(questionState);

  // Fetch questions on component mount
  useEffect(() => {
    dispatch(getQuestions({ level: level, pagination: { pageSize: 15, pageNumber: 1 } }));
  }, [dispatch, level]);

  // const questions = questionState?.questions?.data?.questions || [];


  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

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

  const currentQuestion = questions && questions[currentQuestionIndex];

  return (
    <div>
      {/* Header Section */}
      <div className="container py-4">
        <div className="row justify-content-between align-items-center mb-4 p-3 header-gradient text-white rounded">
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
              />
            </div>
          </div>

          {/* Timer Section */}
          <div className="col-12 col-lg-3 text-center fs-4 font-weight-bold">
            Real Time: {realTime}
          </div>
        </div>
      </div>

      {/* Question Section */}
      <div
        className="quiz-app container py-4"
        style={{ width: "100%", maxWidth: "1200px" }}
      >
        <div className="question-section">
          <div className="question-header d-flex justify-content-between align-items-center bg-light p-3 rounded mb-4">
            <span>Qn. No: {currentQuestion.questionNumber}</span>
            <span>Time: {formatTime(timer)}</span>
          </div>
          <div className="question-body text-center mb-4">
            <p className="mb-2">{currentQuestion.numberOne}</p>
            <p className="mb-2">{currentQuestion.numberTwo}</p>
            <p className="mb-2">{currentQuestion.numberThree}</p>
          </div>
          <div className="navigation d-flex justify-content-between align-items-center">
            <button className="btn btn-primary" onClick={handlePrevious}>
              Previous
            </button>
            <input
              type="text"
              className="form-control mx-3 w-50"
              placeholder="Answer"
            />
            <button className="btn btn-success" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;