import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentForm from "./student/StudentForm";
import LoginHome from "./login/LoginHome";
import MentorForm from "./mentors/MentorsForm";
import TopicSelection from "./mentors/TopicSelection";
import StudentHome from "./student/Home";
import RequireAuth from "./context/RequireAuth";
import LoginStudent from "./login/LoginStudent";
import LoginMentor from "./login/LoginMentor";
import MentorHome from "./mentors/MentorHome";
import TopicSearch from "./student/TopicsSearch";
import LiveClasses from "./student/LiveClasses";
import Doubts from "./student/Doubts";
import MeetRequest from "./mentors/MeetRequest";
import BlogsList from "./student/BlogsList";
import BlogsContent from "./student/BlogsContent";
import RegisterHome from "./login/RegisterHome";
import CreateClass from "./mentors/CreateClass";

import { Provider } from "./context/AuthProvider";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/student" element={<StudentForm />} />
        <Route path="/login" element={<LoginHome />} />
        <Route path="/register" element={<RegisterHome />} />
        <Route
          path="/login/student"
          element={
            <Provider>
              <LoginStudent />
            </Provider>
          }
        />
        <Route
          path="/login/mentor"
          element={
            <Provider>
              <LoginMentor />
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
        <Route
          path="/student/topics"
          element={
            <Provider>
              <RequireAuth>
                <TopicSearch />
              </RequireAuth>
            </Provider>
          }
        />
        <Route
          path="/mentor/home"
          element={
            <Provider>
              <RequireAuth>
                <MentorHome />
              </RequireAuth>
            </Provider>
          }
        />
        <Route
          path="/student/doubts"
          element={
            <Provider>
              <Doubts />
            </Provider>
          }
        />
        <Route
          path="/student/classes"
          element={
            <Provider>
              <LiveClasses />
            </Provider>
          }
        />
        <Route
          path="/blogs"
          element={
            <Provider>
              <BlogsList />
            </Provider>
          }
        />
        <Route
          path="/blogscontent"
          element={
            <Provider>
              <BlogsContent />
            </Provider>
          }
        />
        <Route
          path="/mentor/requests"
          element={
            <Provider>
              <MeetRequest />
            </Provider>
          }
        />
        <Route
          path="/mentor/class"
          element={
            <Provider>
              <CreateClass />
            </Provider>
          }
        />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
