import React, { useState } from "react";

function RegisterPopup() {
  const [showPopup, setShowPopup] = useState(false);

  // Example base64 image (you can replace this with your actual base64)
  const base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...";

  const handleRegisterClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <button onClick={handleRegisterClick}>Register</button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <img src={base64Image} alt="Popup View" style={{ width: "100%", height: "auto" }} />
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}

      {/* Some basic styling */}
      <style>
        {`
          .popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .popup-content {
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            max-width: 500px;
          }
          button {
            margin-top: 20px;
          }
        `}
      </style>
    </div>
  );
}

export default RegisterPopup;
