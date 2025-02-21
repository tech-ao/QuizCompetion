import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./QuizPages.css";
import StudentImage from "../assets/student-image.jpg"; 
 // Add the correct path to your image

const QuizPages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Retrieve user data from Signup.js
  const userData = location.state || {};

  const handleStartTest = () => {
    navigate("/quiz-selection", { state: userData });
  };

  return (
    <Container fluid className="quiz-page">
      <Row className="justify-content-center w-100">
        {/* Left Box - Student Details */}
        <Col lg={5} md={6} sm={12} className="d-flex align-items-stretch">
          <Card className="custom-card">
            <Card.Body>
              <Card.Title className="title">Student Details</Card.Title>
              <div className="details">
                <p><strong>Name:</strong> {userData.name || "________"}</p>
                <p><strong>Level:</strong> {userData.level || "________"}</p>
                <p><strong>D.O.B:</strong> {userData.dob || "________"}</p>
                <p><strong>Email:</strong> {userData.email || "________"}</p>
                <p><strong>Organization:</strong> {userData.organization || "________"}</p>
              </div>
              {/* Student Image */}
              <div className="student-image">
                <img src={StudentImage} alt="Students" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Box - Guidelines */}
        <Col lg={5} md={6} sm={12} className="d-flex align-items-stretch">
          <Card className="custom-card">
            <Card.Body>
              <Card.Title className="title">Guidelines to Start Test</Card.Title>
              <ol className="guidelines-list">
                <li>Read all questions carefully.</li>
                <li>Each question has a time limit.</li>
                <li>Choose the best answer.</li>
                <li>There is no negative marking.</li>
                <li>Ensure a stable internet connection.</li>
                <li>Click "Start Test" to begin.</li>
                <li>Do not refresh during the test.</li>
                <li>Submit answers before time runs out.</li>
              </ol>
              <div className="text-center mt-4">
                <Button className="start-button" onClick={handleStartTest}>
                  Start Test
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default QuizPages;
