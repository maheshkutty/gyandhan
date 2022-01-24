import React, { useContext, useEffect, useState } from "react";
import { Context } from "./AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../firebase/firebase";

export default ({ children }) => {
  const { state, signin } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user != null && state.email == "") {
        const uniqueId = sessionStorage.getItem("uniqueId");
        signin({ email: user.email, uid: user.uid, uniqueId });
      }
    });
  };

  if (state.email == "") {
    return <Navigate to="/login" replace="true" />;
  } else {
    return children;
  }
};
