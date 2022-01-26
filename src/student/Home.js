import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context/AuthProvider";
import SideMenu from "./SideMenu";
import gyandhan from "../api/gyandhan";

export default function HomeStudent() {
  const { state } = useContext(Context);
  const [paDetails, setpaDetails] = useState([]);
  //   useEffect(() => {
  //     console.log(state);
  //   }, [])

  useEffect(() => {
    async function callPersonalDetails() {
      let res = await gyandhan.post("/student/details", {
        sid: state.uniqueId,
      });
      res = res.data;
      setpaDetails(res);
    }
    callPersonalDetails();
    return () => {
      setpaDetails([]);
    };
  }, []);

  return (
    <SideMenu>
      <div className="col">
        <div className="d-flex justify-content-center flex-column align-items-center mt-3">
          <img
            src="/undraw_profile.svg"
            height="200px"
            width="200px"
            className=""
          />
          <h1 className="mt-2">{paDetails["name"]}</h1>
          <div className="col-5">
            <h4 className="text-center m-3">Profile Details</h4>
            <table className="table">
              <tbody>
                <tr>
                  <th scope="row">Current Class</th>
                  <td>{paDetails["class"]}</td>
                </tr>
                <tr>
                  <th scope="row">Address</th>
                  <td>{paDetails["add"]}</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>{paDetails["email"]}</td>
                </tr>
                <tr>
                  <th scope="row">Phone No</th>
                  <td>{paDetails["phone"]}</td>
                </tr>
                <tr>
                  <th scope="row">Score</th>
                  <td>{paDetails["score"]}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SideMenu>
  );
}
