import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentForm from "./student/StudentForm";
import LoginForm from "./login/LoginForm";
import MentorForm from "./mentors/MentorsForm";
import TopicSelection from "./mentors/TopicSelection";
import StudentHome from "./student/Home";
import RequireAuth from "./context/RequireAuth";
import { Provider } from "./context/AuthProvider";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<StudentForm />} />
        <Route
          path="/login"
          element={
            <Provider>
              <LoginForm />
            </Provider>
          }
        />
        <Route path="/mentor" element={<MentorForm />} />
        <Route path="/mentor/topics" element={<TopicSelection />} />
        <Route
          path="/student/home"
          element={
            <Provider>
              <RequireAuth>
                <StudentHome />
              </RequireAuth>
            </Provider>
          }
        />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
