import React, { useState, useContext } from "react";
import Header from "../header/Header";
import Helmet from "react-helmet";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { firebaseApp } from "../firebase/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { Context } from "../context/AuthProvider";
import Alert from "@mui/material/Alert";
import gyandhan from "../api/gyandhan";
import './login.css';

export default function LoginStudent() {
  const { state, signin } = useContext(Context);
  const [errorMsg, setErrorMsg] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      pass: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Required Field"),
      pass: Yup.string().required("Required Field"),
    }),
    onSubmit: async (value) => {
      try {
        const payload = {
          email: value.email,
          pass: value.pass,
        };
        let res = await gyandhan.post("/student/login", payload);
        res = res.data;
        if (res.status == "success") {
          sessionStorage.setItem("uniqueId", res.vals.id);
          const auth = getAuth(firebaseApp);
          setPersistence(auth, browserSessionPersistence).then(async () => {
            const data = await signInWithEmailAndPassword(
              auth,
              value.email,
              value.pass
            );
            if (data != null) {
              signin({ email: data.user.email, userid: data.user.uid, uniqueId: res.vals.id });
              navigate("/student/home");
            } else {
              setErrorMsg(true);
            }
          });
        } else {
          setErrorMsg(true);
        }
      } catch (error) {
        console.log(error);
        setErrorMsg(true);
      }
    },
  });

  return (
    <Header>
      <Helmet bodyAttributes={{ style: "background-color : #364F68" }} />
      <div className="container">
        {errorMsg ? (
          <Alert severity="error" className="mt-2">
            Invalid email and password !!!!
          </Alert>
        ) : null}
        <div className="row justify-content-center">
          <div className="col-5 formContainer">
            <h1 className="text-center">Student Login</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit(e);
              }}
              noValidate
            >
              <div className="mb-1">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="formError">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="mb-1">
                <label htmlFor="email" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="pass"
                  value={formik.values.pass}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.pass && formik.errors.pass ? (
                  <div className="formError">{formik.errors.pass}</div>
                ) : null}
              </div>
              <div>
                <button type="submit" className="btn btn-primary mt-2">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Header>
  );
}
