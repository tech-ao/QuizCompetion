import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./LoginPage.css"; // Import the CSS file for other styles

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/student-details"); // Navigate to the Student Details page
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="login-container p-4">
        <h1>MathGym</h1>
        <h3>Flex Your Brain</h3>
        <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
          <div>
            <label className="form-label">UserName</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-control rounded-pill"
            />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control rounded-pill"
            />
          </div>
          <button type="submit" className="btn w-100 rounded-pill">
            Login
          </button>
          <p>
            <a href="/forgot-password" className="text-danger text-decoration-none">
              Forgot Password?
            </a>
          </p>
        </form>
        <p>
          Do not have an Account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
