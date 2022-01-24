import React from "react";
import SideMenu from "./SideMenu";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

export default function BlogsContent(props) {
  const { state } = useLocation();

  if (state == null) {
    return (
      <div>
        <h1>Invalid Link</h1>
      </div>
    );
  } else {
    return (
      <div className="col">
        <p>{state.created_at}</p>
        <h1>{state.b_title}</h1>
        <p>{state.b_contents}</p>
      </div>
    );
  }
}
