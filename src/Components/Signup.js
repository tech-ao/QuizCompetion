import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    dob: "",
    level: "",
    email: "",
    organization: "",
    competitionDate: "",
    fees: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If the organization field is empty, set it to "Others"
    const finalData = {
      ...formData,
      organization: formData.organization.trim() === "" ? "Others" : formData.organization,
    };

    navigate("/quiz", { state: finalData });
  };

  return (
    <div className="signup-wrapper">
      <div className="branding-left">
        <h1 className="brand-title">MathGym</h1>
        <p className="brand-subtitle">Flex Your Brain</p>
      </div>

      <div className="signup-container">
        <h1 className="form-title">Application Form</h1>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Name", name: "name" },
            { label: "Father's Name", name: "fatherName" },
            { label: "Date of Birth", name: "dob", type: "date" },
            { label: "Level", name: "level" },
          ].map((field) => (
            <div key={field.name} className="form-group">
              <label className="form-label">{field.label}:</label>
              <input
                type={field.type || "text"}
                name={field.name}
                required
                onChange={handleChange}
                className="form-control"
              />
            </div>
          ))}

          {/* Organization Name (Now Below Level) */}
          <div className="form-group">
            <label className="form-label">Organization Name:</label>
            <input
              type="text"
              name="organization"
              placeholder=" Leave blank for Others"
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {[
            { label: "Email", name: "email", type: "email" },
            { label: "Competition Date", name: "competitionDate", type: "date" },
            { label: "Fees", name: "fees", type: "number" },
          ].map((field) => (
            <div key={field.name} className="form-group">
              <label className="form-label">{field.label}:</label>
              <input
                type={field.type || "text"}
                name={field.name}
                required
                onChange={handleChange}
                className="form-control"
              />
            </div>
          ))}

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>

      <div className="branding-right">
        <h1 className="brand-title">MathGym</h1>
        <p className="brand-subtitle">Flex Your Brain</p>
      </div>
    </div>
  );
};

export default Signup;
