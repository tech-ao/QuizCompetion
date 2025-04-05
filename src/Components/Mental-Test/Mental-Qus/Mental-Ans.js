import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate


const MentalAns = () => {
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

  // Handle navigation to the next question (Qys2.jsx)
  const handleNext = () => {
    navigate("/mental-submit"); // Redirect to Qys2.jsx (use your desired route)
  };

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
            
            <span>Time Left: {formatTime(timer)}</span> {/* Countdown timer */}
          </div>
          
          <div className="navigation">
            <button className="nav-button" >Previous</button>
            <input type="text" className="answer-box" placeholder="Answer" />
            <button className="nav-button" onClick={handleNext}>Next</button> {/* Trigger handleNext on click */}
          </div>
        </div>

       
      
    </div>
  );
};

export default MentalAns;



