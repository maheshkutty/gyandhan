import React, { useState, useContext, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import SideMenuMentor from "./SideMenuMentor";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import gyandhan from "../api/gyandhan";
import { Context } from "../context/AuthProvider";
import moment from "moment";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import theme from "../utility/MaterialTheme";
import { ThemeProvider } from "@mui/material/styles";

export default function CreateClass() {
  const { state } = useContext(Context);
  const callCreateClass = () => {};
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = React.useState(moment());
  const [endTime, setEndTime] = useState(moment());
  const cModal = useRef();
  const [allClassess, setAllClassess] = useState([]);

  const handleTimeChanges = (newValue) => {
    setStartTime(newValue);
  };

  const handleEndTimeChanges = (newValue) => {
    setEndTime(newValue);
  };

  const showWeekdaysChips = (weekDays) => {
    return weekDays.map((item) => {
      return (
        <Chip
          label={item}
          sx={{
            backgroundColor: "#FF5959",
            color: "white",
            margin: "0.5em 0.5em 0.5em 0",
          }}
        />
      );
    });
  };

  async function callAllClassess() {
    let res = await gyandhan.post("/mentor/showclasses", {
      mid: state.uniqueId,
    });
    res = res.data;
    console.log(res);
    setAllClassess(res["allClasses"]);
  }

  useEffect(() => {
    callAllClassess();
    return () => {
      setAllClassess([]);
    };
  }, []);

  const callCreateClassAPI = async () => {
    const payload = {
      Men_id: state.uniqueId,
      Class_title: title,
      Start_dateTime: startTime.format("YYYY-MM-DDTHH:mm"),
      End_dateTime: endTime.format("YYYY-MM-DDTHH:mm"),
    };
    console.log(payload);
    let res = await gyandhan.post("/mentor/create_class", payload);
    res = res.data;
    console.log(res);
    if (res.status === "success") {
      cModal.current.click();
    }
  };

  const showAllClassess = () => {
    return allClassess.map((item) => {
      return (
        <Card sx={{ minWidth: 400, margin: "0.5em" }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ color: "#676FA3" }}
              component="div"
            >
              Title: {item["title"]}
            </Typography>
            <Typography variant="h7">Date:</Typography>
            <Typography variant="body2" color="text.secondary">
              {showWeekdaysChips([
                moment(item["startTime"]).format("DD-MM-YYYY"),
              ])}
            </Typography>
            <Typography variant="h7">Timing:</Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ fontSize: "1em" }}
            >
              {moment(item["startTime"]).format("HH:mm")}
              {" To "}
              {moment(item["endTime"]).format("HH:mm")}
            </Typography>
          </CardContent>
          <CardActions>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                onClick={() => {
                  if (item["meetlink"] != "") window.open(item["meetlink"]);
                }}
              >
                Join Meet
              </Button>
            </ThemeProvider>
          </CardActions>
        </Card>
      );
    });
  };

  return (
    <SideMenuMentor>
      <div className="d-flex flex-column m-2">
        <Button
          variant="contained"
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() => {}}
        >
          Create Class
        </Button>
        <h1 className="text-center">All Classess</h1>
        <div className="d-flex flex-wrap">{showAllClassess()}</div>
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
                  Schedule Your Meet
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  ref={cModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="col">
                    <div className="col mb-3">
                      <FormControl variant="outlined" fullWidth>
                        <TextField
                          id="title"
                          className="mt-3"
                          value={title}
                          label="Title"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </FormControl>
                    </div>
                    <div className="col mb-3">
                      <FormControl variant="outlined" fullWidth>
                        <LocalizationProvider
                          dateAdapter={AdapterMoment}
                          fullWidth
                        >
                          <DateTimePicker
                            label="Start Time"
                            value={startTime}
                            onChange={handleTimeChanges}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </div>
                    <div className="col mb-3">
                      <FormControl variant="outlined" fullWidth>
                        <LocalizationProvider
                          dateAdapter={AdapterMoment}
                          fullWidth
                        >
                          <DateTimePicker
                            label="End Time"
                            value={endTime}
                            onChange={handleEndTimeChanges}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </div>
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
                  onClick={() => {
                    callCreateClassAPI();
                  }}
                  className="btn btn-primary"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideMenuMentor>
  );
}
