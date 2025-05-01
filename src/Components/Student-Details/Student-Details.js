import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchStudent } from "../../redux/Action/StudentAction";
import Swal from "sweetalert2"; // Popup library
import axios from "axios"; // For API call
import "./Student-Details.css";
import BASE_URL from "../../redux/Services/Config";

const StudentDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const studentId = localStorage.getItem("studentId");

  const { loading, error, selectedStudent } = useSelector(
    (state) => state.studentDetails
  );

  const student = selectedStudent?.data;

  useEffect(() => {
    if (studentId) {
      dispatch(fetchStudent(studentId));
    }
  }, [dispatch, studentId]);

  const handleStartTest = async () => {
    const scheduleTimeId = 18; // You can make this dynamic if needed
    const url = `${BASE_URL}/Exam/IsStudentEligibleToExam?scheduleTimeId=${scheduleTimeId}&studentId=${studentId}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "text/plain",
          "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
          AccessToken: "123",
          "Content-Type": "application/json",
        },
      });

      if (response.data === true) {
        navigate("/Test-Type");
      } else {
        Swal.fire({
          icon: "warning",
          title: "Not Eligible",
          text: "You are not eligible to attend the exam. You have already attended. Please contact your admin.",
        });
      }
    } catch (error) {
      console.error("API error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while checking eligibility. Try again later.",
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center mt-5 g-4">
        <div className="col-12 col-md-6 col-lg-5 details-section mx-md-3 mx-lg-3 mb-4">
          <h1>Student Details</h1>
          {loading ? (
            <p>Loading student details...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : student ? (
            <>
              <p>Name : {student.firstName}</p>
              <p>Level : {student.gradeName}</p>
              <p>D.O.B : {student.dob}</p>
              <p>Email : {student.email}</p>
              <p>Organization : {student.centerName}</p>
              <div className="image-section">
                <img
                  src={student.imageUrl || "https://via.placeholder.com/150"}
                  alt="Student"
                />
              </div>
            </>
          ) : (
            <p>No student data available</p>
          )}
        </div>

        <div className="col-12 col-md-6 col-lg-5 guidelines-section mx-md-3 mx-lg-3 mb-4">
          <h1>Guidelines to Start Test</h1>
          <ul>
            <li>Step 1: Read all instructions carefully.</li>
            <li>Step 2: Answer all the questions.</li>
            <li>Step 3: Submit when done.</li>
          </ul>
          <button className="start-button" onClick={handleStartTest}>
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
