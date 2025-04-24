import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addStudentAction } from "../../redux/Action/StudentAction"
import BASE_URL from "../../redux/Services/Config";
import axios from "axios";

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
  const [scheduleData, setScheduleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scheduleId = 5; // You can replace this dynamically as needed
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
    grade: null,
    address: "",
    gender: null,
    centerName:"",
    studyModeId: 1,
    country: "",
    isCompetition: true,
    statusId: 3,
    createdBy: 1,

  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();


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


  console.log(scheduleData);

  const getDateList = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateList = [];
  
    while (start <= end) {
      dateList.push(start.toISOString().split("T")[0]);
      start.setDate(start.getDate() + 1);
    }
  
    return dateList;
  };

  const examDates = getDateList(scheduleData?.data.startDate, scheduleData?.data.endDate);
  
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
          grade: null,
          address: "",
          gender: null,
          studyModeId: 1,
          country: "",
          isCompetition: true,
          statusId: 3,
          createdBy: 1,
          centerName:""
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
        <div >
          <h2 className="form-title">Register New Student</h2>
          <Form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <Row className="mb-0">
              <Form.Group as={Col} className="me-3" controlId="formStudentFirstName">
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


            <Form.Group className="mb-0" controlId="formStudentEmail">
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
            <Row className="mb-0">
              <Form.Group as={Col} className="me-3" controlId="formPhoneNumber">
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
            <Form.Group className="mb-0" controlId="formGrade">
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
            <Form.Group className="mb-0" controlId="formGender">
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
            <Form.Group className="mb-3" controlId="formCountry">
            <Form.Label>Country</Form.Label>
            <Form.Select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Country</option>
              {countries.map((country, index) => (
                <option key={index} value={country.item1}>
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
              placeholder="Enter address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

            {/* Center Name */}
            <Form.Group className="mb-0" controlId="formCenterName">
              <Form.Label>Center Name</Form.Label>
              <Form.Control
                type="text"
                name="centerName"
                placeholder="Enter Center Name"
                value={formData.centerName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Exam Date */}
            <Form.Group className="mb-0" controlId="formExamDate">
              <Form.Label>Exam Date</Form.Label>
              <Form.Select
                name="examDate"
               
                onChange={handleInputChange}
                required
              >
                <option value="">Select Exam Date</option>
                {examDates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Fees */}
            <Form.Group className="mb-0" controlId="formFees">
              <Form.Label>Fees</Form.Label>
              <Form.Control
              value={scheduleData?.data.fees}
                type="text"
                name="fees"
                readOnly
              />
            </Form.Group>



            <div className="d-flex align-items-center justify-content-between">
              <Link
                to="/"
                className="rounded-pill px-3 py-1 shadow-sm fw-semibold text-decoration-none"
                style={{
                  fontSize: '16px',
                  width: 'fit-content',
                  border: '1px solid black',  // Black border
                  color: 'black',  // Black text
                  background: 'linear-gradient(to right, #a2f8c2, rgb(245, 245, 160), #a2f8c2)'
                }}
              >
                ← Go To Login
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
