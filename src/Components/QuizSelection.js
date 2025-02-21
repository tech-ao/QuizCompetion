import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, Button, Form, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./QuizSelection.css";

const QuizSelection = () => {
  const location = useLocation();
  const userData = location.state || { name: "Unknown", level: "Unknown" };
  const [timeLeft, setTimeLeft] = useState(180);

  // State for real-time clock
  const [currentTime, setCurrentTime] = useState(new Date());

  // State for quiz functionality
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedMode, setSelectedMode] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const [showNumber, setShowNumber] = useState(false);
  const [blinkingDone, setBlinkingDone] = useState(false);

  // Questions
  const questions = [
    { numbers: [5, 3, 2], answer: "10" },
    { numbers: [7, -14, 8], answer: "1" },
    { numbers: [15, -20, 7], answer: "2" },
  ];

  // Update real-time clock every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format time in HH:MM:SS AM/PM format
  const formatTime = (time) => {
    return time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
  };

  // Handle mode selection
  const handleModeClick = (mode) => {
    setShowQuiz(true);
    setSelectedMode(mode);
    setUserAnswer("");
    setCurrentNumberIndex(0);
    setShowNumber(false);

    if (mode === "Mental") {
      startNumberBlinking();
    }
  };

  // Start blinking numbers in Mental mode
  const startNumberBlinking = () => {
    let index = 0;
    setBlinkingDone(false);
    const interval = setInterval(() => {
      if (index < questions[currentQuestionIndex].numbers.length) {
        setShowNumber(true);
        setCurrentNumberIndex(index);
        setTimeout(() => setShowNumber(false), 500);
        index++;
      } else {
        clearInterval(interval);
        setBlinkingDone(true);
      }
    }, 1000);
  };

  // Move to the next question
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer("");
      setCurrentNumberIndex(0);
      setShowNumber(false);

      if (selectedMode === "Mental") {
        startNumberBlinking();
      }
    } else {
      setQuizFinished(true);
    }
  };

  // Move to the previous question
  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setUserAnswer("");
      setCurrentNumberIndex(0);
      setShowNumber(false);

      if (selectedMode === "Mental") {
        startNumberBlinking();
      }
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) return; // Stop timer when it reaches 0

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [timeLeft]);

  // Convert seconds to MM:SS format
  const formateTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Container fluid>
      {/* NAVBAR */}
      <Navbar className="custom-navbar">
        <Container>
          <Nav className="me-auto">
            <Nav.Link className="custom-text">Name: {userData.name}</Nav.Link>
            <Nav.Link className="custom-text">Level: {userData.level}</Nav.Link>
          </Nav>
          {/* Real-time Clock Display */}
          <Navbar.Text className="custom-text">
            <span className="time-box">{formatTime(currentTime)}</span>
          </Navbar.Text>
        </Container>
      </Navbar>

      {/* QUIZ MODE SELECTION */}
      {!showQuiz && (
        <Row className="d-flex justify-content-center mt-5 vh-100 align-items-center">
          <Col xs={12} md={6}>
            <div className="mode-container">
              <Button variant="black" className="mode-button" onClick={() => handleModeClick("Manuel")}>
                Manual
              </Button>

              <Button variant="black" className="mode-button" onClick={() => handleModeClick("Mental")}>
                Mental
              </Button>
            </div>
          </Col>
        </Row>
      )}

      {/* QUIZ CONTENT */}
      {showQuiz && (
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6}>
            <div className="quiz-container text-center">
              {quizFinished ? (
                <h2 className="text-danger">For any Assistance, Call Incharge</h2>
              ) : (
                <>
                  <h4 className="question-text">Question: {currentQuestionIndex + 1}
                  <span className="quiz-timer">Time:{formateTime(timeLeft)}</span>
                  </h4>

                  <div className="mt-3">
                    {selectedMode === "Manuel" ? (
                      <div className="manual-mode">
                        {questions[currentQuestionIndex].numbers.map((num, index) => (
                          <h3 key={index} className="vertical-number">{num}</h3>
                        ))}
                      </div>
                    ) : (
                      <h3 className="blinking-number">
                        {showNumber ? questions[currentQuestionIndex].numbers[currentNumberIndex] : ""}
                      </h3>
                    )}
                  </div>

                  {blinkingDone || selectedMode === "Manuel" ? (
                    <>
                      <Form.Control
                        type="text"
                        className="answer-input mt-3"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                      />

                      <div className="d-flex justify-content-between mt-3">
                        <Button className="quiz-button" onClick={previousQuestion} disabled={currentQuestionIndex === 0}>
                          Previous
                        </Button>

                        <Button className="quiz-button" onClick={nextQuestion}>
                          Next
                        </Button>
                      </div>
                    </>
                  ) : null}
                </>
              )}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default QuizSelection;
