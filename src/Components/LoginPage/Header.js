import React, { useState } from "react";
import { Navbar, Container, Row, Col, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "../../assets/react.svg"; // Your logo path
import "./Header.css";

const Header = () => {
  const [userName] = useState(localStorage.getItem("studentName") || "Student");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentId");
    navigate("/"); // Change this to your login route
  };

  return (
    <Navbar bg="light" className="shadow-sm py-2">
      <Container fluid>
        <Row className="w-100 align-items-center">
          {/* Logo and Title */}
          <Col xs={6} md={4} className="d-flex align-items-center">
            <img src={logo} alt="Math Gym Logo" height={40} />
            <span className="fw-bold text-success ms-3 fs-5">Welcome to Math Gym</span>
          </Col>

          <Col xs={6} md={8} className="d-flex justify-content-end align-items-center">
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                <FaUserCircle size={20} className="me-2" />
                {userName}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Header;
