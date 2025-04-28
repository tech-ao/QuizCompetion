import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./LoginPage.css"; // Your existing styles
import BASE_URL from "../../redux/Services/Config";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify"; // Import Toastify for notifications

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for popup
  const [newPassword, setNewPassword] = useState(""); // State for new password
  const [oldPassword, setOldPassword] = useState(""); // State for old password
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const apiUrl = `${BASE_URL}/Login/StudentSignin?Email=${encodeURIComponent(
        username
      )}&Password=${encodeURIComponent(password)}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
          AccessToken: "123",
        },
      });

      const data = await response.json();

      if (response.ok && data.isSuccess && data.data) {
        if (data.data.statusId === 2 || data.data.statusId === 3) {
          navigate("/Pending");
        } else {
          // Check if it's the user's first login
          if (data.data.isFirstLogin) {
            setShowPopup(true);
          } else {
            // ✅ Set session values
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("userRole", "Student");

            // ✅ Set studentId in localStorage
            localStorage.setItem("studentId", data.data.studentId);

            navigate("/student-details", { state: { userData: data.data } });
          }
        }
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!oldPassword || !newPassword) {
      setError("Please enter both old and new password.");
      return;
    }

    try {
      const updateApiUrl = `${BASE_URL}/PasswordManager/StudentChangePassword?StudentId=${localStorage.getItem(
        "studentId"
      )}&OldPassword=${encodeURIComponent(oldPassword)}&Password=${encodeURIComponent(newPassword)}`;

      const response = await fetch(updateApiUrl, {
        method: "POST",
        headers: {
          "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
          AccessToken: "123",
        },
      });

      const result = await response.json();

      if (result.isSuccess) {
        toast.success("Password updated successfully. Please log in with your new password.");
        setShowPopup(false);
        setUsername(""); // Reset username field
        setPassword(""); // Reset password field
      } else {
        setError("Failed to update password. Please check your old password.");
      }
    } catch (err) {
      console.error("Error updating password:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="login-container p-4">
        <h1>MathGym</h1>
        <h3>Flex Your Brain</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
          <div>
            <label className="form-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-control rounded-pill"
              placeholder="Enter username"
            />
          </div>
          <div className="position-relative">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control rounded-pill"
              placeholder="Enter password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="position-absolute top-50 end-0 translate-middle-y mt-3 me-3"
              style={{ cursor: "pointer" }}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-pill" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-center mb-0">
            <a href="/forgotPassword" className="text-danger text-decoration-none">
              Forgot Password?
            </a>
          </p>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>

      {/* Password Update Modal for First Login */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handlePasswordUpdate}>
            Update Password
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginPage;
