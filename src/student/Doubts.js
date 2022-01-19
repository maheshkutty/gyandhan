import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import SideMenu from "./SideMenu";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import "./doubts.css";
import gyandhan from "../api/gyandhan";
import Alert from "@mui/material/Alert";
import AlertMsg from "../utility/AlertMsg";

const mainTopics = ["geography", "maths"];
const answers = [
  {
    ans:"",
    tname:"",
    datetime:""
  }
]

const questions = [
  {
    id:"aid",
    question: "What is latitute longitute?",
    subject: "geogrphy",
    dateTime: "12/07/1998 12:00",
    sname:"",
    status:"a p"
  },
  {
    question: "What is latitute longitute?",
    subject: "geogrphy",
    dateTime: "12/07/1998 12:00",
  },
  {
    question: "What is latitute longitute?",
    subject: "geogrphy",
    dateTime: "12/07/1998 12:00",
  },
  {
    question: "What is latitute longitute?",
    subject: "geogrphy",
    dateTime: "12/07/1998 12:00",
  },
  {
    question: "What is latitute longitute?",
    subject: "geogrphy",
    dateTime: "12/07/1998 12:00",
  },
  {
    question: "What is latitute longitute?",
    subject: "geogrphy",
    dateTime: "12/07/1998 12:00",
  },
  {
    question: "What is latitute longitute?",
    subject: "geogrphy",
    dateTime: "12/07/1998 12:00",
  },
  {
    question: "What is latitute longitute?",
    subject: "geogrphy",
    dateTime: "12/07/1998 12:00",
  },
  {
    question: "What is latitute longitute?",
    subject: "geogrphy",
    dateTime: "12/07/1998 12:00",
  },
];
export default function Doubts() {
  const [subjects, setSubjects] = useState(mainTopics);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [inputQuestion, setInputQuestion] = useState("");
  const [alertMsgState, setAlertMsgState] = useState({
    type: "success",
    flag: false,
    msg: null,
  });
  const qModal= useRef(null);

  const subjectMenuItem = () => {
    return subjects.map((item) => {
      return <MenuItem value={item}>{item}</MenuItem>;
    });
  };

  const saveDoubts = async () => {
    //console.log(document.getElementById("exampleModal").modal)
    //qModal.modal
    const reqData = {
      stdId: "8",
      title: selectedSubject,
      contents: inputQuestion,
    };
    let res = await gyandhan.post("/student/create_doubt", reqData);
    res = res.data;
    console.log(res);
    if (res.status == "success") {
      setAlertMsgState({
        flag: true,
        msg: "Your doubts is recorded",
        type: "success",
      });
    } else {
      setAlertMsgState({
        flag: true,
        msg: "Error while processing your request",
        type: "err",
      });
    }
    qModal.current.click();
  };

  const listQuestion = () => {
    return questions.map((item) => {
      return (
        <Card sx={{ maxWidth: 1000, margin: "0.5em" }}>
          <CardContent>
            <Typography
              variant="caption"
              sx={{
                fontWeight: "bold",
                fontSize: "1em",
                textTransform: "capitalize",
              }}
            >
              ➡️
              {item.subject}{" "}
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontWeight: "bold", fontSize: "1em" }}
            >
              {item.dateTime}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {item.question}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Answer</Button>
          </CardActions>
        </Card>
      );
    });
  };

  return (
    <SideMenu>
      <div className="row justify-content-center">
        <div className="col-8 mainConatiner">
          {AlertMsg(alertMsgState)}
          <h1 style={{ marginBottom: "0.5em", color: "#370665" }}>
            What you want to know ? 🤔
          </h1>
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
            style={{ borderRadius: "10px", padding: "0.5em 2em 0.5em 2em" }}
          >
            Ask Questions
          </button>
        </div>
        <div class="w-100"></div>
        <div className="col-8">
          <h1>Your friends need help !!!</h1>
          {listQuestion()}
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Ask Your Questions
                </h5>
                <button
                 ref={qModal}
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="col">
                  <div className="col mb-3">
                    <TextField
                      id="question"
                      label="Ask your questions"
                      multiline
                      rows="4"
                      fullWidth
                      value={inputQuestion}
                      onChange={(event) => setInputQuestion(event.target.value)}
                    />
                  </div>
                  <div className="col mb-3">
                    <FormControl fullWidth>
                      <InputLabel id="subject-label">Subject</InputLabel>
                      <Select
                        labelId="subject-label"
                        id="demo-simple-select"
                        value={selectedSubject}
                        label="Subject"
                        onChange={(event) =>
                          setSelectedSubject(event.target.value)
                        }
                      >
                        {subjectMenuItem()}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                 
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveDoubts}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideMenu>
  );
}
