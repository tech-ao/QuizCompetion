// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage/LoginPage";
import ApplicationForm from "./Components/Application-Form/Application-Form";
import StudentDetails from "./Components/Student-Details/Student-Details";
import Question from "./Components/Question/Question";
import TestType from "./Components/Test-Type/Test-Type"; 
import ManualSubmit from "./Components/Manual-Submit/manual-submit"; 
import MentalTest from "./Components/Mental-Test/Mental-Test";
import MentalQus from "./Components/Mental-Test/Mental-Qus/Mental-Qus1";
import MentalQus2 from "./Components/Mental-Test/Mental-Qus/Mental-Qus2";
import MentalAns from "./Components/Mental-Test/Mental-Qus/Mental-Ans";
import MentalSubmit from "./Components/Mental-Test/Mental-Submit/Mental-Submit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<ApplicationForm />} />
      <Route path="/student-details" element={<StudentDetails />} />
      <Route path="/question" element={<Question />} />
      <Route path="/Test-Type" element={<TestType />} />
      <Route path="/manual-submit" element={<ManualSubmit />} />
      <Route path="/mental-test" element={<MentalTest />} />
      <Route path="/mental-qus1" element={<MentalQus />} />
      <Route path="/mental-qus2" element={<MentalQus2 />} />
      <Route path="/mental-ans" element={<MentalAns />} />
      <Route path="/mental-submit" element={<MentalSubmit />} />
    </Routes>
  );
}

export default App;
