import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Mental-Submit.css";

const ManualSubmit = () => {
  const [realTime, setRealTime] = useState(""); // Real-time clock
  const clockRef = useRef(null); // Reference for the clock update

  // Real-time clock logic using requestAnimationFrame for smoother updates
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

      // Update the clock only if the time has changed
      if (realTime !== timeString) {
        setRealTime(timeString);
      }

      // Request next animation frame
      clockRef.current = requestAnimationFrame(updateClock);
    };

    clockRef.current = requestAnimationFrame(updateClock);

    // Cleanup on component unmount
    return () => cancelAnimationFrame(clockRef.current);
  }, [realTime]); // Dependency on realTime to ensure proper updates

  return (
    <div>
      {/* Header Section */}
      <div className="mental-submit-container py-0">
        <div className="row justify-content-between align-items-center mb-4 p-3 header-gradient text-white ">
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
      

      {/* Other Content */}
      <div className="quiz-app  py-0" style={{ width: "100%", maxWidth: "1200px" }}>
        <div className="question-section">
          <div className="question-header d-flex justify-content-center align-items-center  p-3 rounded mb-4">
            <span style={{color:"red"}}>For Any Assistance Call Incharge</span>
          </div>
          <div className="question-body text-center mb-4">
            
            <p className="mb-2">No. of Qus: 10</p>
            <p className="mb-2">Time Taken:07:28</p>
            <p className="mb-2">Answered: 7</p>
            <p className="mb-2">Not Answered: 3</p>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
};

export default ManualSubmit;
