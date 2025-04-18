import { useState, useEffect, useRef  } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./manual-submit.css";

function ManualSubmit() {
  const [realTime, setRealTime] = useState("");
  const navigate = useNavigate();
  const clockRef = useRef(null);

  const studentId = localStorage.getItem("studentId");

  const { loading, error, selectedStudent: selectedStudent } = useSelector(
    (state) => state.studentDetails
  );


const student = selectedStudent?.data

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
    navigate("/mental-test");
  };

  return (
    <div>
      <div className="container py-4">
        <div className="row justify-content-between align-items-center mb-4 p-3 header-gradient text-white rounded">
          <div className="col-12 col-lg-8 d-flex gap-4">
            <div className="d-flex flex-column flex-lg-row w-50 mb-2">
              <label className="font-weight-bold mb-2" htmlFor="name">Name:</label>
              <input id="name" type="text" value={student.firstName} className="form-control border-0 border-bottom w-100 mt-2 ms-2" />
            </div>
            <div className="d-flex flex-column flex-lg-row w-50 mb-2">
              <label className="font-weight-bold mb-2" htmlFor="level">Level:</label>
              <input id="level" type="text" value={student.gradeName}className="form-control border-0 border-bottom w-100 mt-2 ms-2" />
            </div>
          </div>
          <div className="col-12 col-lg-3 text-center fs-4 font-weight-bold">Real Time: {realTime}</div>
        </div>
      </div>
      <div className="quiz-app container py-4" style={{ width: "100%", maxWidth: "1200px" }}>
        <div className="question-section">
          <div className="question-header d-flex justify-content-center align-items-center bg-light p-3 rounded mb-4">
            <span>For Any Assistance Call Incharge</span>
          </div>
          <div className="question-body text-center mb-4">
            <p className="mb-2">Time Taken: 07:30</p>
            <p className="mb-2">No. of Qus: 10</p>
            <p className="mb-2">Answered: 7</p>
            <p className="mb-2">Not Answered: 3</p>
          </div>
          <div className="navigation d-flex justify-content-center align-items-center">
            <button className="btn btn-success" onClick={handleNextClick}>Continue Your Test Here.</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManualSubmit;
