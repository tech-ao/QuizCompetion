import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Mental-Qus1.css";

const MentalQus2 = () => {
  const [timer, setTimer] = useState(600); // Countdown timer (10 minutes in seconds)
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date()); // Real-world time
  const navigate = useNavigate(); // Initialize navigate

  // Countdown timer logic
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown); // Cleanup interval on component unmount
  }, []);

  // Real-world time logic
  useEffect(() => {
    const realTime = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(realTime); // Cleanup on unmount
  }, []);

  // Format the timer into MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Format the current time
  const formatRealTime = (time) => {
    return time.toLocaleTimeString(); // This will display time in HH:MM:SS format
  };


  // Redirect to MentalAns after 2 seconds
  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate("/mental-ans"); // Redirect to MentalAns
    }, 2000); // 2000ms = 2 seconds

    return () => clearTimeout(redirectTimeout); // Cleanup timeout on unmount
  }, [navigate]);

  return (
    <div className="quiz-app">
      {/* Header Section */}
      <div className="header">
        <div className="header-input">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Level:
            <input
              type="text"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
          </label>
        </div>
        <div className="header-timer">
          Time: {formatRealTime(currentTime)}
        </div>
      </div>

      {/* Content Section */}
      
        <div className="question-section">
          <div className="question-header">
            <span>Qn. No : 2</span>
            <span>Time: {formatTime(timer)}</span> {/* Countdown timer */}
          </div>
          <div className="question-body">
            <p>50</p>
          </div>
        
        </div>
     
    </div>
  );
};

export default MentalQus2;
