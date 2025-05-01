import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Mental-Submit.css";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import axios from "axios";
import { fetchStudent } from "../../../redux/Action/StudentAction";
import BASE_URL from "../../../redux/Services/Config";

const COMMON_HEADERS = {
  Accept: "text/plain",
  "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
  AccessToken: "123",
  "Content-Type": "application/json",
};

const getHeaders = () => ({
  ...COMMON_HEADERS,
});

const ManualSubmit = () => {
  const [realTime, setRealTime] = useState("");
  const clockRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const studentId = localStorage.getItem("studentId");
  const { loading, error, selectedStudent } = useSelector((state) => state.studentDetails);
  const student = selectedStudent?.data;
  const [qnResult, setQnResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const [width, height] = useWindowSize();
  const examId = location.state?.examId;

  // Fetch student details
  useEffect(() => {
    if (studentId) {
      dispatch(fetchStudent(studentId));
    }
  }, [dispatch, studentId]);

  // Real-time clock logic
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

      if (realTime !== timeString) {
        setRealTime(timeString);
      }

      clockRef.current = requestAnimationFrame(updateClock);
    };

    clockRef.current = requestAnimationFrame(updateClock);

    return () => cancelAnimationFrame(clockRef.current);
  }, [realTime]);

  // Submit and Validate Exam
  useEffect(() => {
    const submitExam = async () => {
      try {
        await axios.post(`${BASE_URL}/Exam/Submit?ExamId=${examId}`, {}, { headers: getHeaders() });
        console.log("Exam Submitted Successfully!");
      } catch (error) {
        console.error("Error submitting exam:", error);
      }
    };

    const validateExam = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/Exam/Validator?ExamId=${examId}`, {}, { headers: getHeaders() });
        setQnResult(response?.data);
        console.log("Exam Validated Successfully!");
      } catch (error) {
        console.error("Error validating exam:", error);
      }
    };

    if (examId) {
      submitExam();
      validateExam();
    }
  }, [examId]);

  // Confetti Hide after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleContinueClick = () => {
    navigate("/");
  };

  return (
    <div className="mental-submit-container py-0">
      {showConfetti && <Confetti width={width} height={height} />}
      
      <div className="row justify-content-between align-items-center mb-4 p-3 header-gradient text-white">
        {/* Name and Level Inputs */}
        <div className="col-12 col-lg-8 d-flex gap-4">
          <div className="d-flex flex-column flex-lg-row w-50 mb-2">
            <label className="font-weight-bold mb-2" htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={student?.firstName || ""}
              readOnly
              className="form-control border-0 border-bottom w-100 mt-2 ms-2"
            />
          </div>
          <div className="d-flex flex-column flex-lg-row w-50 mb-2">
            <label className="font-weight-bold mb-2" htmlFor="level">Level:</label>
            <input
              id="level"
              type="text"
              value={student?.gradeName || ""}
              readOnly
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
      <div className="quiz-app py-0" style={{ width: "100%", maxWidth: "1200px" }}>
        <div className="question-section">
          <div className="question-header d-flex justify-content-center align-items-center p-3 rounded mb-4">
            <span style={{ color: "red" }}>🎉 For Any Assistance Call Incharge 🎉</span>
          </div>

          <div className="question-body text-center mb-4">
            <p className="mb-2">Time Taken: 07:30</p> {/* You can dynamically pass Time Taken if needed */}
            <p className="mb-2">No. of Qus: {qnResult?.data?.allocatedQuestions || "-"}</p>
            <p className="mb-2">Answered: {qnResult?.data?.completedQuestions || "-"}</p> {/* Assuming answered is same as allocated */}
            <p className="mb-2">Correct Answer: {qnResult?.data?.correct || "-"}</p>
            <p className="mb-2">Wrong Answer: {qnResult?.data?.wrong || "-"}</p>
          </div>

          {/* Continue Button */}
          <div className="navigation d-flex justify-content-center align-items-center p-5">
            <button className="btn btn-success" onClick={handleContinueClick}>
             Complete Test
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ManualSubmit;
