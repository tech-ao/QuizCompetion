import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {addStudentAction} from "../../redux/Action/StudentAction"
import {
  fetchCountries,
  fetchGrades,
  fetchGenders,
  fetchStudentMode,
} from "../../redux/Services/Enum";
import "./Application-Form.css"; // Import the CSS file
import RegisterHeader from "./RegisterHeader";
import { useNavigate, Link } from "react-router-dom";
const RegisterStudent = () => {
  const [countries, setCountries] = useState([]);
  const [grades, setGrades] = useState([]);
  const [genders, setGenders] = useState([]);
  const [classModes, setClassModes] = useState([]);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const [birthCertificatePreview, setBirthCertificatePreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    grade: "",
    address: "",
    gender: "",
    studyModeId: "",
    country: "",
    statusId: 3,
    createdBy: 1,
    profile: {
      name: "",
      extension: "",
      base64Content: "",
    },
    birthCertificate: {
      name: "",
      extension: "",
      base64Content: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Content = reader.result.split(",")[1];
          const extension = file.name.split(".").pop();

          const field = name === "profile" ? "profile" : "birthCertificate";

          setFormData((prevData) => ({
            ...prevData,
            [field]: {
              name: file.name,
              extension: extension,
              base64Content: base64Content,
            },
          }));
        };
        reader.readAsDataURL(file);
        const previewURL = URL.createObjectURL(file);

        if (name === "profile") {
          setPreview(previewURL);
        } else if (name === "birthCertificate") {
          setBirthCertificatePreview(previewURL);
        }
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: ["country", "grade", "gender", "studyModeId"].includes(name)
          ? parseInt(value, 10)
          : value,
      }));
    }
  };

  // Fetch dropdown data on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const countriesData = await fetchCountries();
        setCountries(countriesData);

        const gradesData = await fetchGrades();
        setGrades(gradesData);

        const gendersData = await fetchGenders();
        setGenders(gendersData);

        const classModesData = await fetchStudentMode();
        setClassModes(classModesData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        toast.error("Failed to load form data.");
      }
    };

    fetchAllData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Submitting Form Data:", formData); // Debugging

      const response = await dispatch(addStudentAction(formData));

      console.log("Response from Action:", response); // Debugging

      if (response?.isSuccess) {
        toast.success("Student registered successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          dob: "",
          grade: "",
          address: "", 
          gender: "",
          studyModeId: "",
          country: "",
          statusId: 3,
          createdBy: 1
        });
        setPreview(null);
        setBirthCertificatePreview(null);
      } else {
        throw new Error(response?.message || "Failed to register student!");
      }
    } catch (error) {
      console.error("Error Response:", error); // Debugging
      toast.error(error?.response?.message || error.message || "Failed to register student!");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="register-student-container"><RegisterHeader />
      <div className="register-student-page registerbg-image">
        {/* Register Header Component Added */}

        <div >
          <h2 className="form-title">Register New Student</h2>
          <Form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formStudentFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formStudentLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formStudentEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Contact Information */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    const regex = /^[0-9\b]+$/;
                    if (e.target.value === "" || regex.test(e.target.value)) {
                      setFormData((prevData) => ({
                        ...prevData,
                        phoneNumber: e.target.value,
                      }));
                    }
                  }}
                  maxLength={10}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formDob">
                <Form.Label>Date of Birth</Form.Label>
                 <Form.Control
                              type="date"
                              name="dob"
                              value={formData.dob}
                              onChange={handleInputChange}
                              required
                              max={new Date().toISOString().split("T")[0]} // Prevents future dates
                            />
              </Form.Group>
            </Row>

            {/* Academic Information */}
            <Form.Group className="mb-3" controlId="formGrade">
              <Form.Label>Grade</Form.Label>
              <Form.Select
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Grade</option>
                {grades.map((grade) => (
                  <option key={grade.item1} value={grade.item1}>
                    {grade.item2}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Gender */}
            <Form.Group className="mb-3" controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Row>
                {genders.map((gender) => (
                  <Col key={gender.item1} xs={6} md={4}>
                    <Form.Check
                      type="radio"
                      label={gender.item2}
                      name="gender"
                      value={gender.item1}
                      checked={formData.gender === gender.item1}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                ))}
              </Row>
            </Form.Group>

            {/* Class Mode */}
            <Form.Group className="mb-3" controlId="formClassMode">
              <Form.Label>Class Mode</Form.Label>
              <Row>
                {classModes.map((mode) => (
                  <Col key={mode.item1} xs={6} md={4}>
                    <Form.Check
                      type="radio"
                      label={mode.item2}
                      name="studyModeId"
                      value={mode.item1}
                      checked={formData.studyModeId === mode.item1}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                ))}
              </Row>
            </Form.Group>

            {/* Country */}
            <Form.Group className="mb-3" controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.item1} value={country.item1}>
                    {country.item2}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            

            <Form.Group className="mb-3" controlId="formAddress">
  <Form.Label>Address</Form.Label>
  <Form.Control
    as="textarea"
    name="address"
    rows={3}
    placeholder="Enter your address"
    value={formData.address}
    onChange={handleInputChange}
    required
  />
</Form.Group>

            <div className="d-flex align-items-center justify-content-between">
              <Link to="/" className="text-decoration-none text-success me-2">
                Go to Login
              </Link>
              <Button variant="success" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register Student"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
