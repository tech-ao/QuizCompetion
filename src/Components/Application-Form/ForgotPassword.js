import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../redux/Services/Config";
import RegisterHeader from "./RegisterHeader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleVerifyEmail = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${BASE_URL}/PasswordManager/StudentForgotPassword?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
            AccessToken: "123",
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.isSuccess) {
        setIsVerified(true);
        setSuccess("📩 Email sent successfully. Please check your inbox.");
      } else {
        setError(data.message || "⚠️ Failed to verify email.");
      }
    } catch (err) {
      console.error("Error verifying email:", err);
      setError("❌ An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <RegisterHeader />
      <Container className="register-student-container">
        <Row className="w-100">
          <Col xs={12} md={6} lg={5} className="mx-auto">
            <Card className="shadow-lg border-0 rounded-4 p-4">
              <Card.Body>
                <h3 className="text-center mb-4 fw-bold text-success">Forgot Password</h3>

                {/* Display Success or Error Messages */}
                {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                {success && <Alert variant="success" className="text-center">{success}</Alert>}

                <Form>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label className="fw-semibold">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      readOnly={isVerified}
                      required
                      className="py-2"
                    />
                  </Form.Group>

                  {!isVerified && (
                    <Button
                      variant="success"
                      className="w-100 py-2 fw-semibold"
                      onClick={handleVerifyEmail}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" /> Verifying...
                        </>
                      ) : (
                        "Verify Email"
                      )}
                    </Button>
                  )}

                  <Button
                    variant="outline-secondary"
                    className="w-100 mt-2 py-2 fw-semibold"
                    onClick={() => navigate("/")}
                  >
                    Close
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;
