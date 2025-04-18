import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";

const TestType = () => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
 const studentId = localStorage.getItem("studentId");

  const { loading, error, selectedStudent: selectedStudent } = useSelector(
    (state) => state.studentDetails
  );


const student = selectedStudent?.data
  // Update real-time clock
  useEffect(() => {
    const intervalId = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // Format current time as HH:MM:SS
  const formatTime = (time) => time.toLocaleTimeString();

  // Handle Manual click event to navigate to Question page
  const handleManualClick = () => {
    navigate("/question"); // Navigate to /question route
  };

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
                value={student.firstName}
                onChange={(e) => setName(e.target.value)}
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
                value={student.gradeName}
                onChange={(e) => setLevel(e.target.value)}
                className="form-control border-0 border-bottom w-100 mt-2 ms-2"
              />
            </div>
          </div>

          {/* Timer Section */}
          <div className="col-12 col-lg-3 text-center fs-4 font-weight-bold">
            Time: {formatTime(currentTime)}
          </div>
        </div>
      </div>

      {/* Manual and Mental Boxes Section */}
      <div className="container">
<div className="row mt-4 justify-content-center" style={{ maxWidth: "1400px", width: "100%", margin: "0 auto" }}>
          {/* Manual Section */}
          <div
            className="col-12 col-md-6 col-lg-5 d-flex justify-content-center align-items-center mb-3"
            onClick={handleManualClick}
          >
            <div className="box p-4 d-flex justify-content-center align-items-center  bg-white text-dark rounded shadow-sm"
              style={{ height: "150px", width: "150px" }}>
              <p className="mb-0">Manual</p>
            </div>
          </div>

          {/* Mental Section */}
          <div className="col-12 col-md-6 col-lg-5 d-flex justify-content-center align-items-center mb-3">
            <div className="box p-4 d-flex justify-content-center align-items-center  bg-success text-white rounded shadow-sm"
              style={{ height: "150px", width: "150px" }}>
              <p className="mb-0">Mental</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestType;
