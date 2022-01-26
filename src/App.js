import "./App.css";
import StudentForm from "./student/StudentForm";
import { Link } from "react-router-dom";
import Header from "./header/Header";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import MaterialTheme from "./utility/MaterialTheme";

function App() {
  return (
    <div>
      <Header />
      <div className="d-flex">
        <div className="imgConatiner">
          <div className="row row-bg-overlay justify-content-center">
            <div className="align-content-center align-item-center">
              <h1 className="headingText">Learn from mentors</h1>
              <div className="d-flex justify-content-center">
                <ThemeProvider theme={MaterialTheme}>
                  <Button
                    variant="contained"
                    color="red1"
                    className="headingButton"
                    style={{ fontSize: "1.2em" }}
                  >
                    Start Meeting
                  </Button>
                </ThemeProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center flex-column align-items-center">
        <h1 className="subText">We are gyandhan</h1>
        <p>Our jobs to connect the mentees to mentors</p>
      </div>
      <div
        className="d-flex justify-content-start"
        style={{ backgroundColor: "#05050a", color: "#cccccc" }}
      >
        <div className="ml-5 mt-3">
          <p style={{margin:0}}>Connect With Us</p>
          <p style={{ color: "#0e76a8", fontSize:"2em" }}>
            <i class="fab fa-linkedin"></i>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
