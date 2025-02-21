import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Container, Row, Col, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import "./Login.css";

export const Login = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      navigate("/quiz");
    }
  };

  return (
    <div className="login-container">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col xs={10} sm={8} md={6} lg={4}>
            <Card className="small-card shadow-lg p-3">
              <Card.Body>
                <h1 className="text-center small-heading mt-5">Math Gym</h1>
                <h3 className="text-center small-subheading mb-5">Flex Your Brain</h3>
                <Form onSubmit={handleLogin}>
                  {/* Username Field */}
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label className="small-label">Username</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter Username" 
                      required 
                      className="custom-input"
                    />
                  </Form.Group>

                  {/* Password Field */}
                  <Form.Group className="mb-2" controlId="password">
                    <Form.Label className="small-label">Password</Form.Label>
                    <InputGroup className="position-relative">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="custom-input"
                      />
                      {/* Password Toggle Icon Inside Input Field */}
                      <FaEyeSlash 
                        className={`password-icon ${showPassword ? "d-none" : "d-block"}`} 
                        onClick={handleTogglePassword} 
                      />
                      <FaEye 
                        className={`password-icon ${showPassword ? "d-block" : "d-none"}`} 
                        onClick={handleTogglePassword} 
                      />
                    </InputGroup>
                    {passwordError && <p className="text-danger small-text">{passwordError}</p>}
                  </Form.Group>

                  {/* Forgot Password Link */}
                  <div className="text-center">
                    <Link to="/forgot-password" className="text-decoration-none small-link">
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Login Button */}
                  <Button type="submit" className="small-btn w-50 d-block mx-auto mt-5 mb-3">
                    Login
                  </Button>

                  {/* Signup Link */}
                  <p className="text-center mt-4 small-text">
                    Don't have an account? <Link to="/signup" className="signup-link">Signup</Link>
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
};
