import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Application-Form.css";

const ApplicationForm = () => {
  const [isInstitutionDisabled, setIsInstitutionDisabled] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCheckboxChange = () => {
    setIsInstitutionDisabled(!isInstitutionDisabled);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    navigate("/"); // Navigate to LoginPage
  };

  return (
    <div className="application-form-container">
      <div className="form-wrapper">
        <div className="mathgym-logo">MathGym<br />Flex Your Brain</div>
        <h1 className="form-title">Application Form</h1>
        <form onSubmit={handleSubmit}> {/* Wrap form fields with <form> */}
          <div className="form-group">
            <label className="form-label">Name:</label>
            <input type="text" className="form-input" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label className="form-label">Father Name:</label>
            <input type="text" className="form-input" placeholder="Enter father's name" />
          </div>
          <div className="form-group">
            <label className="form-label">Date of Birth:</label>
            <input type="date" className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Grade:</label>
            <input type="text" className="form-input" placeholder="Enter grade" />
          </div>
          <div className="form-group">
            <label className="form-label">Institution Name:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter institution name"
              disabled={isInstitutionDisabled}
            />
          </div>
          <div className="form-group">
            <label className="form-label">
              <input
                type="checkbox"
                className="checkbox-input"
                onChange={handleCheckboxChange}
              />
              Others
            </label>
          </div>
          <div className="form-group">
            <label className="form-label">Competition Date:</label>
            <input type="date" className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Fees:</label>
            <input type="text" className="form-input" placeholder="Enter fee details" />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
