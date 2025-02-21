import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login";
import Signup from "./Components/Signup";
import QuizPages from "./Components/QuizPages";  
import QuizSelection from "./Components/QuizSelection";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/quiz" element={<QuizPages />} /> 
      <Route path="/quiz-selection" element={<QuizSelection />} />  
    </Routes>
  );
}

export default App;
