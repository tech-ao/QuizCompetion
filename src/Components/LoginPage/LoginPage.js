import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./LoginPage.css"; // Your existing styles
import BASE_URL from "../../redux/Services/Config";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
          // ✅ Set session values
          sessionStorage.setItem("isLoggedIn", "true");
          sessionStorage.setItem("userRole", "Student");

          // ✅ Set studentId in localStorage
          localStorage.setItem("studentId", data.data.studentId);

          navigate("/student-details", { state: { userData: data.data } });
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
    </div>
  );
};

export default LoginPage;
