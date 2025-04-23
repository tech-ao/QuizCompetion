import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../../redux/Services/Config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getQuestions } from "../../redux/Action/QuestionAction";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Question.css";
import { fetchStudent } from "../../redux/Action/StudentAction";

const Questions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [timer, setTimer] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [realTime, setRealTime] = useState("");
  const [name, setName] = useState("");
  const [level] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  const [questions, setQuestions] = useState([]);
  const [scheduleData, setScheduleData] = useState(null);

  const [examId, setExamId] = useState(null);
  const [onExamId, setOnExamId] = useState(null);

  const scheduleId = 6;
  const studentId = localStorage.getItem("studentId");

  const questionState = useSelector((state) => state.questionList);
  const { selectedStudent } = useSelector((state) => state.studentDetails);
  const student = selectedStudent?.data;

  const COMMON_HEADERS = {
    Accept: "text/plain",
    "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
    AccessToken: "123",
    "Content-Type": "application/json",
  };
  
  const getHeaders = () => ({
    ...COMMON_HEADERS,
  });
  


  useEffect(() => {
    if (studentId) {
      dispatch(fetchStudent(studentId));
    }
  }, [dispatch, studentId]);

  useEffect(() => {
    dispatch(getQuestions({ level: level, pagination: { pageSize: 15, pageNumber: 1 } }));
  }, [dispatch, level]);

  useEffect(() => {
    if (questionState.questions?.data?.questions && scheduleData?.data?.manual) {
      const fetchedQuestions = questionState.questions.data.questions;
      const shuffledQuestions = fetchedQuestions.sort(() => 0.5 - Math.random());
      setQuestions(shuffledQuestions.slice(0, scheduleData.data.manual));
    }
  }, [questionState, scheduleData]);

  useEffect(() => {
    if (!scheduleId) return;
    const fetchScheduleById = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/ScheduleTime/GetById?Id=${scheduleId}`, {
          headers: {
            accept: "text/plain",
            "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
            AccessToken: "123",
          },
        });
        if (response.data) {
          setScheduleData(response.data);
        } else {
          setScheduleData(null);
        }
      } catch (err) {
        setError("Failed to load schedule data");
      } finally {
        setLoading(false);
      }
    };
    fetchScheduleById();
  }, [scheduleId]);

  useEffect(() => {
    if (scheduleData?.data?.totalTime) {
      setTimer(Number(scheduleData.data.totalTime) * 60);
    }
  }, [scheduleData]);

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

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleNext = async () => {
    if (questions.length === 0) return;

    const currentQuestion = questions[currentQuestionIndex];
    const now = new Date().toISOString();

    if (examId === null) {
      // First time — CREATE
      try {
        const response = await fetch(`${BASE_URL}/Exam/Create`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({
            studentId: parseInt(studentId),
            level: level,
            scheduleTimeId: scheduleId,
            questionId: currentQuestion.id,
            sNo: currentQuestion.no,
            answer: answer,
            onExamCreatedOn: now,
            examCreatedOn: now,
          }),
        });

        if (!response.ok) throw new Error("Failed to create exam");

        const data = await response.json();
        setExamId(data.data.id);
        setOnExamId(data.data.onExamId);
      } catch (error) {
        console.error("Create failed", error);
        return;
      }
    } else {
      // From second time — UPDATE
      try {
        const response = await fetch(`http://srimathicare.in:8081/api/Exam/Update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            examId: examId,
            onExamId: onExamId,
            studentId: parseInt(studentId),
            level: level,
            scheduleTimeId: scheduleId,
            questionId: currentQuestion.id,
            sNo: currentQuestion.no,
            answer: answer,
            onExamCreatedOn: now,
            examCreatedOn: now,
          }),
        });

        if (!response.ok) throw new Error("Failed to update exam");
      } catch (error) {
        console.error("Update failed", error);
        return;
      }
    }

    if (currentQuestionIndex === questions.length - 1) {
      navigate("/manual-submit");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnswer("");
    }
  };

  const handlePrevious = async () => {
    if (questions.length === 0) return;

    const currentQuestion = questions[currentQuestionIndex];
    const now = new Date().toISOString();

    if (examId !== null) {
      try {
        const response = await fetch(`${BASE_URL}/Exam/Update`, {
           method: "PUT",
        headers: getHeaders(),
          body: JSON.stringify({
            examId: examId,
            onExamId: onExamId,
            studentId: parseInt(studentId),
            level: level,
            scheduleTimeId: scheduleId,
            questionId: currentQuestion.id,
            sNo: currentQuestion.no,
            answer: answer,
            onExamCreatedOn: now,
            examCreatedOn: now,
          }),
        });

        if (!response.ok) throw new Error("Failed to update exam");
      } catch (error) {
        console.error("Update failed", error);
        return;
      }
    }

    if (currentQuestionIndex === 0) {
      navigate("/test-type");
    } else {
      setCurrentQuestionIndex((prev) => prev - 1);
      setAnswer("");
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      {/* Header */}
      <div className="container py-4">
        <div className="row justify-content-between align-items-center mb-4 p-3 header-gradient text-white rounded">
          <div className="col-12 col-lg-8 d-flex gap-4">
            <div className="d-flex flex-column flex-lg-row w-50 mb-2">
              <label className="font-weight-bold mb-2" htmlFor="name">Name:</label>
              <input id="name" type="text" className="form-control border-0 border-bottom w-100 mt-2 ms-2"
                value={student?.firstName} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="d-flex flex-column flex-lg-row w-50 mb-2">
              <label className="font-weight-bold mb-2" htmlFor="level">Level:</label>
              <input id="level" type="text" className="form-control border-0 border-bottom w-100 mt-2 ms-2"
                value={student?.gradeName} readOnly />
            </div>
          </div>
          <div className="col-12 col-lg-3 text-center fs-4 font-weight-bold">
            Real Time: {realTime}
          </div>
        </div>
      </div>

      {/* Question Section */}
      <div className="quiz-app container py-4" style={{ width: "100%", maxWidth: "1200px" }}>
        {loading ? (
          <div className="text-center">Loading questions...</div>
        ) : error ? (
          <div className="text-danger text-center">Error loading questions.</div>
        ) : questions.length > 0 ? (
          <div className="question-section">
            <div className="question-header d-flex justify-content-between align-items-center bg-light p-3 rounded mb-4">
              <span>Qn. No: {currentQuestion?.no}</span>
              <span>Time: {formatTime(timer)}</span>
            </div>

            <div className="question-body text-center mb-4">
              {currentQuestion?.questions?.split(",").map((number, index) => (
                <p className="mb-2" key={index}>{number}</p>
              ))}
            </div>

            <div className="navigation d-flex justify-content-between align-items-center">
              <button className="btn btn-primary" onClick={handlePrevious}>Previous</button>
              <input type="text" className="form-control mx-3 w-50" placeholder="Answer"
                value={answer} onChange={(e) => setAnswer(e.target.value)} />
              <button className="btn btn-success" onClick={handleNext}>Next</button>
            </div>
          </div>
        ) : (
          <div className="text-center">No questions available.</div>
        )}
      </div>
    </div>
  );
};

export default Questions;
