import React, { useState } from "react";
import Header from "../header/Header";
import "./student.css";
import Helmet from "react-helmet";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { firebaseApp } from "../firebase/firebase";
import { useFormik } from "formik";
import * as Yup from "yup";
import gyandhan from "../api/gyandhan";
import Alert from "@mui/material/Alert";

export default function StudentForm() {
  let [successMsg, setSucessMsg] = useState(false);
  let [errorMsg, setErrorMsg] = useState(false);

  Yup.addMethod(Yup.string, "passwordChk", function (errmsg) {
    return this.test(`test-password-check`, errmsg, function (value) {
      const { path, createError } = this;
      let pattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!pattern.test(value)) return createError({ path, message: errmsg });
      else return true;
    });
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      class: "",
      phone: "",
      add: "",
      email: "",
      pass: "",
      stream: "",
      score: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required Field"),
      class: Yup.string().required("Required Field"),
      add: Yup.string().required("Required Field"),
      phone: Yup.string().required("Required Field"),
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Required Field"),
      pass: Yup.string()
        .passwordChk(
          "Password must have length 8 that include 1 UpperCase, 1 LowerCase and 1 special character letter"
        )
        .required("Required Field"),
      stream: Yup.string().required("Required Field"),
      score: Yup.number("Score must be number").required("Required Field"),
    }),
    onSubmit: async (values) => {
      try {
        const auth = getAuth(firebaseApp);
        const payload = {
          name: values.name,
          class: values.class,
          stream: values.stream,
          address: values.add,
          email: values.email,
          pass: values.pass,
          score: values.score,
          phone: values.phone,
        };
        let res = await gyandhan.post("/student/register", payload);
        res = res.data;
        console.log(res);
        if (res.status == "success") {
          const user = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.pass
          );
          setSucessMsg(true);
          setErrorMsg(false);
        } else {
          setSucessMsg(false);
          setErrorMsg(true);
        }
        formik.resetForm();
        window.scrollTo(0, 0);
      } catch (error) {
        setErrorMsg(true);
        setSucessMsg(false);
        window.scrollTo(0, 0);
        console.log(error);
      }
    },
  });

  return (
    <Header>
      <Helmet bodyAttributes={{ style: "background-color : #364F68" }} />
      <div className="container-fluid fill">
        {successMsg ? (
          <Alert severity="success" className="mt-2">
            You sucessfully register
          </Alert>
        ) : null}
        {errorMsg ? (
          <Alert severity="error" className="mt-2">
            Error while registration !!!!
          </Alert>
        ) : null}
        <div className="row justify-content-center">
          <div className="col-5 align-items-stretch formContainer">
            <div className="d-flex justify-content-center align-items-start">
              <div>
                <h1>Create Your Account</h1>
                <p>Already have a account?</p>
              </div>
            </div>
            <form
              onSubmit={(e) => {
                formik.handleSubmit(e);
              }}
              noValidate
            >
              <div className="mb-1">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="mb-1">
                <label htmlFor="stream" className="form-label">
                  Stream
                </label>
                <select
                  className="form-select form-select-lg mb-3 form-control"
                  value={formik.values.stream}
                  name="stream"
                  id="stream"
                  aria-label=".form-select-lg example"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                >
                  <option value={""}>Open this select menu</option>
                  <option value="general">General</option>
                  <option value="science">Science</option>
                  <option value="arts">Arts</option>
                </select>
                {formik.touched.stream && formik.errors.stream ? (
                  <div>{formik.errors.stream}</div>
                ) : null}
              </div>
              <div className="mb-1">
                <label htmlFor="class" className="form-label">
                  Class
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="class"
                  value={formik.values.class}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.class && formik.errors.class ? (
                  <div>{formik.errors.class}</div>
                ) : null}
              </div>
              <div className="mb-1">
                <label htmlFor="score" className="form-label">
                  Score
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="score"
                  value={formik.values.score}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.score && formik.errors.score ? (
                  <div>{formik.errors.score}</div>
                ) : null}
              </div>
              <div className="mb-1">
                <label htmlFor="add" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="add"
                  value={formik.values.add}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.add && formik.errors.add ? (
                  <div>{formik.errors.add}</div>
                ) : null}
              </div>
              <div className="mb-1">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={formik.values.phone}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div>{formik.errors.phone}</div>
                ) : null}
              </div>
              <div className="mb-1">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="mb-2">
                <label htmlFor="pass" className="form-label">
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
                  <div>{formik.errors.pass}</div>
                ) : null}
              </div>
              <div className="mb-1">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Header>
  );
}
