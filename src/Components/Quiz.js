// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles.css";

// const questions = [
//   { question: "What is 5 + 3?", options: ["6", "7", "8", "9"], answer: "8" },
//   { question: "What is 12 - 4?", options: ["6", "8", "7", "9"], answer: "8" },
// ];

// const Quiz = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const navigate = useNavigate();

//   const handleAnswer = (answer) => {
//     if (answer === questions[currentQuestion].answer) {
//       setScore(score + 1);
//     }
//     if (currentQuestion + 1 < questions.length) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       alert(`Quiz Over! Your score: ${score + 1}`);
//       navigate("/");
//     }
//   };

//   return (
//     <div className="container quiz-container">
//       <h1>Quiz</h1>
//       <h3>{questions[currentQuestion].question}</h3>
//       {questions[currentQuestion].options.map((option, index) => (
//         <button key={index} onClick={() => handleAnswer(option)}>
//           {option}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Quiz;
