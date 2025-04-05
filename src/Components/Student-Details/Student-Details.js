import { useNavigate } from "react-router-dom";
import "./Student-Details.css";

const StudentDetails = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate("/Test-Type");
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center mt-5 g-4">
        {/* Details Section */}
        <div className="col-12 col-md-6 col-lg-5 details-section mx-md-3 mx-lg-3 mb-4">
          <h1>Student Details</h1>
          <p>Name :</p>
          <p>Level :</p>
          <p>D.O.B :</p>
          <p>Email :</p>
          <p>Organization :</p>
          <div className="image-section">
            <img
              src="https://via.placeholder.com/150"
              alt="Kids learning"
            />
          </div>
        </div>

        {/* Guidelines Section */}
        <div className="col-12 col-md-6 col-lg-5 guidelines-section mx-md-3 mx-lg-3 mb-4">
          <h1>Guidelines to Start Test</h1>
          <ul>
            <li>Step 1: Read all instructions carefully.</li>
            <li>Step 2: Answer all the questions.</li>
            <li>Step 3: Submit when done.</li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className="start-button-div">
            <button className="start-button" onClick={handleStartTest}>
              Start Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
