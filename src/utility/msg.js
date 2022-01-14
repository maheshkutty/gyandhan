import react from "react";

export default function errorMsg(props) {

  return <div className="alert alert-danger"> 
    {props.children}
  </div>;
}
