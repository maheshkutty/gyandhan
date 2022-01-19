import react, { useState } from "react";
import Helmet from "react-helmet";
import Header from "../header/Header";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { firebaseApp } from "../firebase/firebase";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./mentor.css";
import gyandhan from "../api/gyandhan";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

export default function MentorForm() {
  let [successMsg, setSucessMsg] = useState(false);
  let [errorMsg, setErrorMsg] = useState(false);
  let [loading, setLoading] = useState(false);

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
      degree: "",
      phone: "",
      add: "",
      email: "",
      pass: "",
      stream: "",
      quali: "",
      score: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required Field"),
      degree: Yup.string().required("Required Field"),
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
      degree: Yup.string().required("Required Field"),
      quali: Yup.string().required("Required Field"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        let formData = {
          name: values.name,
          address: values.add,
          score: values.score,
          phone: values.phone,
          email: values.email,
          pass: values.pass,
          qual: values.quali,
          mlink: "",
        };
        let res = await gyandhan.post("/mentor/register", formData);
        res = res.data;
        console.log(res);
        if (res.status == "success") {
          const auth = getAuth(firebaseApp);
          const user = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.pass
          );
          console.log(user);
          setSucessMsg(true);
          setErrorMsg(false);
        } else {
          setSucessMsg(false);
          setErrorMsg(true);
        }
        formik.resetForm();
        window.scrollTo(0, 0);
        setLoading(false);
      } catch (error) {
        setErrorMsg(true);
        setSucessMsg(false);
        console.log(error);
        setLoading(false);
      }
    },
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-start mt-5 loadingbar">
        <CircularProgress />
      </div>
    );
  } else {
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
                  <h1>Mentors Account</h1>
                  <p>Already have a account?</p>
                </div>
              </div>
              <form onSubmit={formik.handleSubmit}>
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
                    <div className="formError">{formik.errors.name}</div>
                  ) : null}
                </div>
                <div className="mb-1">
                  <label htmlFor="stream" className="form-label">
                    Stream
                  </label>
                  <select
                    class="form-select form-select-lg mb-3 form-control"
                    value={formik.values.stream}
                    name="stream"
                    id="stream"
                    aria-label=".form-select-lg example"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  >
                    <option selected value={""}>
                      Open this select menu
                    </option>
                    <option value="general">General</option>
                    <option value="science">Science</option>
                    <option value="arts">Arts</option>
                  </select>
                  {formik.touched.stream && formik.errors.stream ? (
                    <div className="formError">{formik.errors.stream}</div>
                  ) : null}
                </div>
                <div className="mb-1">
                  <label htmlFor="degree" className="form-label">
                    Degree
                  </label>
                  <select
                    class="form-select form-select-lg mb-3 form-control"
                    value={formik.values.degree}
                    name="degree"
                    id="degree"
                    aria-label=".form-select-lg example"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  >
                    <option selected value={""}>
                      Open this select menu
                    </option>
                    <option value="general">Bachelor</option>
                    <option value="science">Master</option>
                    <option value="arts">PhD</option>
                  </select>
                  {formik.touched.degree && formik.errors.degree ? (
                    <div className="formError">{formik.errors.degree}</div>
                  ) : null}
                </div>
                <div className="mb-1">
                  <label htmlFor="quali" className="form-label">
                    Qualification
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="quali"
                    value={formik.values.quali}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.quali && formik.errors.quali ? (
                    <div className="formError">{formik.errors.quali}</div>
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
                    <div className="formError">{formik.errors.add}</div>
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
                    <div className="formError">{formik.errors.phone}</div>
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
                    <div className="formError">{formik.errors.email}</div>
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
                    <div className="formError">{formik.errors.pass}</div>
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
}
