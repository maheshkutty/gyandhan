import "./App.css";
import StudentForm from "./student/StudentForm";
import { Link } from "react-router-dom";
import Header from "./header/Header";

function App() {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row imgConatiner"></div>
        <div className="row  row-bg-overlay justify-content-center">
          <div className="align-content-center align-item-center" style={{fontSize:"4em", color:"white", marginTop:"1em"}}>Learn from mentors</div>
        </div>
      </div>
    </div>
  );
}

export default App;
