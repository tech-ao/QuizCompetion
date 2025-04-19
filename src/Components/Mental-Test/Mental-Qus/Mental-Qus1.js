import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Questions = () => {
  const [timer, setTimer] = useState(600); // Countdown timer (10 minutes in seconds)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index for current question
  const [realTime, setRealTime] = useState(""); // Real-time clock
  const [currentNumber, setCurrentNumber] = useState(null); // Controls the number being displayed
  const [isInputVisible, setIsInputVisible] = useState(false); // Controls visibility of the input box
  const [showNextButton, setShowNextButton] = useState(false); // Controls visibility of the "Next" button
  const navigate = useNavigate(); // Initialize navigate

  // Memoizing the questions array to avoid unnecessary re-renders
  const questions = useMemo(() => [
    { questionNumber: 1, numbers: [11, -24, 67] },
    { questionNumber: 2, numbers: [35, 42, -15] },
    { questionNumber: 3, numbers: [7, -9, 19] },
    { questionNumber: 4, numbers: [28, -16, 34] },
    { questionNumber: 5, numbers: [50, 21, -13] },
    { questionNumber: 6, numbers: [-12, 8, 44] },
    { questionNumber: 7, numbers: [19, -33, 10] },
    { questionNumber: 8, numbers: [60, -45, 25] },
    { questionNumber: 9, numbers: [14, -6, 38] },
    { questionNumber: 10, numbers: [3, 5, -7] },
  ], []); // Empty dependency array to ensure questions array doesn't change

  // Countdown timer logic
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown); // Cleanup interval on component unmount
  }, []);

  // Real-time clock logic
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

    return () => clearInterval(updateClock); // Cleanup interval on component unmount
  }, []);

  // Logic to show numbers sequentially
  useEffect(() => {
    setIsInputVisible(false); // Hide input box initially
    setCurrentNumber(null); // Reset the current number

    let index = 0;
    const interval = setInterval(() => {
      if (index < questions[currentQuestionIndex].numbers.length) {
        setCurrentNumber(questions[currentQuestionIndex].numbers[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsInputVisible(true); // Show input box after last number
        setShowNextButton(true); // Show "Next" button after the last number
      }
    }, 1000); // Change number every 1 second

    return () => clearInterval(interval); // Cleanup interval on question change
  }, [currentQuestionIndex, questions]); // Add questions to the dependency array

  // Format the timer into MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle navigation to the next question or the mental-submit.jsx file
  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      navigate("/mental-submit"); // Navigate to the mental-submit.jsx file
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Handle navigation to the previous question or the test-type.jsx file
  const handlePrevious = () => {
    if (currentQuestionIndex === 0) {
      navigate("/mental-test"); // Navigate to the test-type.jsx file
    } else {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Get the current question
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      {/* Header Section */}
      <div className="mental-ques-1-container py-0">
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
      

      {/* Question Section */}
      <div
        className="quiz-app  py-0"
        style={{ width: "100%", maxWidth: "1200px" }}
      >
        <div className="question-section">
          <div className="question-header d-flex justify-content-between align-items-center  p-3 rounded mb-4">
            <span>Qn. No: {currentQuestion.questionNumber}</span>
            <span>Time: {formatTime(timer)}</span>
          </div>
          <div className="question-body text-center mb-4">
            {/* Render the current number */}
            <p className="mb-2">{currentNumber}</p>
          </div>
          {isInputVisible && (
            <div className="navigation d-flex justify-content-between align-items-center">
              <button className="btn btn-primary" onClick={handlePrevious}>
                Previous
              </button>
              <input
                type="text"
                className="form-control mx-3 w-50"
                placeholder="Answer"
              />
              {showNextButton && (
                <button className="btn btn-success" onClick={handleNext}>
                  Next
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Questions;
