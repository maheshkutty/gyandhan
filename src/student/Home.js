import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context/AuthProvider";
import SideMenu from "./SideMenu";

export default function HomeStudent() {
  //   const {state} = useContext(Context);
  //   useEffect(() => {
  //     console.log(state);
  //   }, [])
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
          <h1 className="mt-2">Mahesh Kutty</h1>
          <div className="col-5">
            <h4 className="text-center m-3">Profile Details</h4>
            <table className="table">
              <tbody>
                <tr>
                  <th scope="row">Current Class</th>
                  <td>7</td>
                </tr>
                <tr>
                  <th scope="row">Topics</th>
                  <td>7</td>
                </tr>
                <tr>
                  <th scope="row">Address</th>
                  <td>7</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>7</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SideMenu>
  );
}
