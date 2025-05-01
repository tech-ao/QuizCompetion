import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../../../redux/Services/Config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getQuestions } from "../../../redux/Action/QuestionAction";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Question/Question.css"
import { fetchStudent } from "../../../redux/Action/StudentAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

 const [scheduleId,setScheduleId]=useState()
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

const manualQuestion = scheduleData?.data?.mental


useEffect(() => {
  const fetchLatestScheduleId = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/ScheduleTime/GetAll`, {
        headers: getHeaders(),
      });

      if (response.data?.data?.length > 0) {
        const latestSchedule = response.data.data.at(-1); // ✅ get the last item
        setScheduleId(latestSchedule.id);
      } else {
        toast.error("No schedules found");
      }
    } catch (error) {
      console.error("Failed to fetch schedules:", error);
      toast.error("Failed to fetch schedule data");
    }
  };

  fetchLatestScheduleId();
}, []);



useEffect(() => {
  if (questionState.questions?.data?.questions) {
    const fetchedQuestions = questionState.questions.data.questions;
    const shuffledQuestions = fetchedQuestions.sort(() => 0.5 - Math.random());
    const limitedQuestions = shuffledQuestions.slice(0, manualQuestion || shuffledQuestions.length);
    
    setQuestions(limitedQuestions);
  }
}, [questionState, manualQuestion]);


 
  
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
        console.log(response);
        
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
  
    // ✅ 1. Prevent moving forward if answer is empty
    if (!answer || answer.trim() === "") {
      toast.error("Please enter an answer before proceeding.");
      return;
    }
  
    // ✅ 2. Save or Update the answer
    try {
      const payload = {
        studentId: parseInt(studentId),
        level: level,
        scheduleTimeId: scheduleId,
        isManual:false,
        questionId: currentQuestion.questionId,
        sNo: currentQuestion.no,
        answer: answer,
        onExamCreatedOn: now,
        examCreatedOn: now,
      };
  
      if (examId === null) {
        // Create
        const response = await fetch(`${BASE_URL}/Exam/Create`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) throw new Error("Failed to create exam");
  
        const data = await response.json();
        setExamId(data.data[0].examId);
        setOnExamId(data.data[0].onExamId);
        
      } else {
        // Update
        const response = await fetch(`${BASE_URL}/Exam/Create`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({
            ...payload,
            examId: examId,
            onExamId: onExamId,
          }),
        });
  
        if (!response.ok) throw new Error("Failed to update exam");
      }
    } catch (error) {
      console.error("Error saving answer:", error);
      return;
    }
  
    // ✅ 3. Navigate if last question, else move to next
    if (currentQuestionIndex === questions.length - 1) {
    navigate("/mental-submit", { state: { examId: examId } });

    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnswer("");
    }
  };

  const handlePrevious = async () => {
    if (questions.length === 0) return;

    const currentQuestion = questions[currentQuestionIndex];
    const now = new Date().toISOString();

    console.log(examId);
    console.log(onExamId);
    
    

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
            isManual:false,
            scheduleTimeId: scheduleId,
            questionId: currentQuestion.questionId,
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
      {/* Header Section */}
      <div className="question-container py-0">
        <div className="row justify-content-between align-items-center mb-0 p-1 header-gradient text-white rounded">
          {/* Name and Level Inputs */}
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
      

      {/* Question Section */}
      <div className="quiz-app  py-4" style={{ width: "100%", maxWidth: "1200px" }}>
        {loading ? (
          <div className="text-center">Loading questions...</div>
        ) : error ? (
          <div className="text-danger text-center">Error loading questions.</div>
        ) : questions.length > 0 ? (
          <div className="question-section">
            <div className="question-header d-flex justify-content-between align-items-center  p-3  mb-1">
              <span>Qn. No: {currentQuestionIndex+1}</span>
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
    </div>
  );
};

export default Questions;
