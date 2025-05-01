import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Mental-Submit/Mental-Submit.css";
import { fetchStudent } from "../../../redux/Action/StudentAction";
import axios from "axios";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import BASE_URL from "../../../redux/Services/Config";
import { useLocation } from "react-router-dom";




const COMMON_HEADERS = {
  Accept: "text/plain",
  "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
  AccessToken: "123",
  "Content-Type": "application/json",
};

const getHeaders = () => ({
  ...COMMON_HEADERS,
});

function ManualSubmit() {
  const [realTime, setRealTime] = useState("");
  const [showConfetti, setShowConfetti] = useState(true);
  const clockRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const studentId = localStorage.getItem("studentId");
  const { loading, error, selectedStudent } = useSelector((state) => state.studentDetails);
  const student = selectedStudent?.data;
  const [width, height] = useWindowSize();
  const [qnResult , setQnResult] = useState(null)
  const location = useLocation();
const examId = location.state?.examId;
const CompletedTime = location.state?.CompletedTime;
const scheduleData = location.state?.scheduleData;
const [minutesStr, secondsStr] = CompletedTime.split(':');
const completedMinutes = parseInt(minutesStr, 10) + parseInt(secondsStr, 10) / 60;

const totalTime = scheduleData.totalTime
// Calculate remaining time
const remainingTime = totalTime - completedMinutes;

// Optional: Convert to mm:ss format
const remainingMinutes = Math.floor(remainingTime);
const remainingSeconds = Math.round((remainingTime - remainingMinutes) * 60);
const formattedRemainingTime = `${remainingMinutes}:${remainingSeconds.toString().padStart(2, '0')}`;







  useEffect(() => {
    if (studentId) {
      dispatch(fetchStudent(studentId));
    }
  }, [dispatch, studentId]);

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

  const handleNextClick = () => {
    navigate("/");
  };

  // Call Submit and Validator API on page load
  useEffect(() => {
    const submitExam = async () => {
      try {
        await axios.post(
          `${BASE_URL}/Exam/Submit?ExamId=${examId}&CompletedTime=${CompletedTime}`,
          {},
          { headers: getHeaders() }
        );        
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

    submitExam();
    validateExam();
  }, []);

  // Hide confetti after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  
  return (
    <div className="manual-page-container">
      {showConfetti && <Confetti width={width} height={height} />}
      <div className="balloons"></div> {/* Balloons animation */}
      
      <div className="manuel-container py-4">
        <div className="row justify-content-between align-items-center mb-4 p-3 header-gradient text-white rounded">
          <div className="col-12 col-lg-8 d-flex gap-4">
            <div className="d-flex flex-column flex-lg-row w-50 mb-2">
              <label className="font-weight-bold mb-2" htmlFor="name">Name:</label>
              <input id="name" type="text" value={student?.firstName} readOnly className="form-control border-0 border-bottom w-100 mt-2 ms-2" />
            </div>
            <div className="d-flex flex-column flex-lg-row w-50 mb-2">
              <label className="font-weight-bold mb-2" htmlFor="level">Level:</label>
              <input id="level" type="text" value={student?.gradeName} readOnly className="form-control border-0 border-bottom w-100 mt-2 ms-2" />
            </div>
          </div>
          <div className="col-12 col-lg-3 text-center fs-4 font-weight-bold">
            Real Time: {realTime}
          </div>
        </div>

        <div className="quiz-app py-0" style={{ width: "100%", maxWidth: "1200px" }}>
          <div className="question-section">
            <div className="question-header d-flex justify-content-center align-items-center p-3 rounded mb-4">
              <span style={{ color: 'red' }}>🎉 For Any Assistance Call Incharge 🎉</span>
            </div>
            <div className="question-body text-center mb-4">
              <p className="mb-2">Time Taken: {formattedRemainingTime}</p>
              <p className="mb-2">No. of Qus: {qnResult?.data?.allocatedQuestions}</p>
              <p className="mb-2">Answered:{qnResult?.data?.completedQuestions}</p>
              <p className="mb-2">Correct Answer: {qnResult?.data?.correct}</p>
              <p className="mb-2">Wrong Answer: {qnResult?.data?.wrong}</p>
            </div>
            <div className="navigation d-flex justify-content-center align-items-center p-5">
              <button className="btn btn-success" onClick={handleNextClick}>
                Complete the Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManualSubmit;
