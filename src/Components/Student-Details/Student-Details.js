import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchStudent } from "../../redux/Action/StudentAction";
import "./Student-Details.css";

const StudentDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const studentId = localStorage.getItem("studentId");

  console.log(studentId);
  

  const { loading, error, selectedStudent: selectedStudent } = useSelector(
    (state) => state.studentDetails
  );
console.log(selectedStudent);

const student = selectedStudent?.data

  useEffect(() => {
    if (studentId) {
      dispatch(fetchStudent(studentId));
    }
  }, [dispatch, studentId]);

  const handleStartTest = () => {
    navigate("/Test-Type");
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center mt-5 g-4">
        <div className="col-12 col-md-6 col-lg-5 details-section mx-md-3 mx-lg-3 mb-4">
          <h1>Student Details</h1>
          {loading ? (
            <p>Loading selectedStudent details...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : student ? (
            <>
              <p>Name : {student.firstName}</p>
              <p>Level : {student.gradeName}</p>
              <p>D.O.B : {student.dob}</p>
              <p>Email : {student.email}</p>
              <p>Organization : {student.centerName}</p>
              <p>Fees : {student.fees}</p>
              <div className="image-section">
                <img
                  src={student.imageUrl || "https://via.placeholder.com/150"}
                  alt="Student"
                />
              </div>
            </>
          ) : (
            <p>No selectedStudent data available</p>
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
