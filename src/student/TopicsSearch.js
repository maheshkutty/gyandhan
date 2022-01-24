import React, { useState, useEffect, useContext } from "react";
import SideMenu from "./SideMenu";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Input from "@mui/material/Input";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import gyandhan from "../api/gyandhan";
import { Context } from "../context/AuthProvider";

//import

const mainTopics = ["geography", "maths"];
const mainDays = [
  { value: "1", label: "mondays" },
  { value: "2", label: "tuesday" },
];

const meetRequest = {
  sid: "8",
  daysOfWeek: ["sunday"],
  time: "17-07-2021 09:00",
  topic: ["class 10 maths"],
};

const meetResponse = {
  sid: "8",
  daysOfWeek: ["sunday"],
  time: "17-07-2021 09:00",
  topic: ["class 10 maths"],
  meetLink: "",
  tname: "",
};

export default function TopicSearch() {
  const [subject, setSubject] = useState([]);
  const [fixedSub, setFixedSub] = useState([]);
  const [topics, setTopics] = useState("");
  const [topicsArr, setTopicsArr] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [days, setDays] = useState(mainDays);
  const [timeStartValue, setStartTimeValue] = useState(null);
  const [timeEndValue, setEndTimeValue] = useState(null);
  const [tabValue, setTabValue] = useState("1");
  const [pendingReq, setPendingReq] = useState([]);
  const [confirmReq, setConfirmReq] = useState([]);
  const { state } = useContext(Context);

  useEffect(() => {
    async function callPendingReq() {
      let res = await gyandhan.post("/student/showpendingmeet", {
        sid: state.uniqueId,
      });
      res = await res.data;
      console.log(res);
      setPendingReq(res["pendingReq"]);
    }
    callPendingReq();
    return () => {
      setPendingReq([]);
    };
  }, []);

  useEffect(() => {
    async function callConfirmedReq() {
      let res = await gyandhan.post("/student/showconfirmedmeet", {
        sid: state.uniqueId,
      });
      res = await res.data;
      console.log(res);
      setConfirmReq(res["confiremdReq"]);
    }
    callConfirmedReq();
    return () => {
      setConfirmReq([]);
    };
  }, []);

  const handleDaysChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedDays(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleTabsChange = (event, newValue) => {
    setTabValue(newValue);
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

  const showPendingRequest = () => {
    return pendingReq.map((item) => {
      return (
        <Card sx={{ minWidth: 400, margin: "0.5em" }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ color: "#676FA3" }}
              component="div"
            >
              Subject: {item["subjects"].join(",")}
            </Typography>
            <Typography variant="h7">Week days:</Typography>
            <Typography variant="body2" color="text.secondary">
              {showWeekdaysChips(item["weekdays"])}
            </Typography>
            <Typography variant="h7">Timing:</Typography>
            <Typography variant="body2" color="text.secondary">
              {item["startTime"]} {item["endTime"]}
            </Typography>
            <Typography variant="h7">Topics</Typography>
            <Typography variant="body2" color="text.secondary">
              {item["topics"].join(",")}
            </Typography>
          </CardContent>
        </Card>
      );
    });
  };

  const showConfirmedReq = () => {
    return confirmReq.map((item) => {
      return (
        <Card sx={{ minWidth: 400, margin: "0.5em" }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ color: "#676FA3" }}
              component="div"
            >
              Subject: {item["subjects"].join(",")}
            </Typography>
            <Typography variant="h7">Week days:</Typography>
            <Typography variant="body2" color="text.secondary">
              {showWeekdaysChips(item["weekdays"])}
            </Typography>
            <Typography variant="h7">Timing:</Typography>
            <Typography variant="body2" color="text.secondary">
              {item["startTime"]} {item["endTime"]}
            </Typography>
            <Typography variant="h7">Topics</Typography>
            <Typography variant="body2" color="text.secondary">
              {item["topics"].join(",")}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <a target="_blank" href={item["meetLink"]}>
                Join Meet
              </a>
            </Button>
          </CardActions>
        </Card>
      );
    });
  };

  const showTopics = () => {
    return topicsArr.map((item) => {
      return (
        <Chip
          label={item}
          onDelete={() => {
            console.log("New");
            let tempTopics = topicsArr.filter((element) => {
              if (element != item) return element;
            });
            setTopicsArr(tempTopics);
          }}
        />
      );
    });
  };

  const daysOfWeek = () => {
    return days.map((item) => {
      return <MenuItem value={parseInt(item.value)}>{item.label}</MenuItem>;
    });
  };

  return (
    <SideMenu>
      <div className="col">
        <h1>Lets connect to mentors</h1>
        <Button
          variant="contained"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Schedule Meet
        </Button>
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
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="col">
                    <div className="col mb-3">
                      <FormControl variant="outlined" id="subjects" fullWidth>
                        <Autocomplete
                          multiple
                          id="subjects"
                          value={subject}
                          onChange={(event, newValue) => {
                            setSubject([
                              ...fixedSub,
                              ...newValue.filter(
                                (option) => fixedSub.indexOf(option) === -1
                              ),
                            ]);
                          }}
                          options={mainTopics}
                          renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => (
                              <Chip
                                label={option}
                                {...getTagProps({ index })}
                                disabled={fixedSub.indexOf(option) !== -1}
                              />
                            ))
                          }
                          style={{ marginTop: "2em" }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Subjects"
                              placeholder="Add Subjects"
                            />
                          )}
                        />
                      </FormControl>
                    </div>
                    <div className="col mb-3">
                      {showTopics()}
                      <br />
                      <FormControl variant="outlined" fullWidth>
                        <TextField
                          id="topics"
                          className="mt-3"
                          value={topics}
                          label="Topics"
                          onChange={(e) => setTopics(e.target.value)}
                        />
                        <Button
                          variant="contained"
                          onClick={() => {
                            if (topics != "")
                              setTopicsArr([...topicsArr, topics]);
                          }}
                        >
                          Add Topics
                        </Button>
                      </FormControl>
                    </div>
                    <div className="col mb-3">
                      <FormControl
                        variant="outlined"
                        id="days"
                        sx={{ minWidth: 120 }}
                        fullWidth
                      >
                        <InputLabel id="days">Days</InputLabel>
                        <Select
                          id="days"
                          multiple
                          value={selectedDays}
                          label="Days"
                          onChange={handleDaysChange}
                        >
                          {daysOfWeek()}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col mb-3">
                      <FormControl fullWidth>
                        <LocalizationProvider
                          dateAdapter={AdapterMoment}
                          fullWidth
                        >
                          <TimePicker
                            labelId="sdate"
                            label="Start Time"
                            value={timeStartValue}
                            onChange={(newValue) => {
                              setStartTimeValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </div>
                    <div className="col mb-3">
                      <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <TimePicker
                            label="Choose End Time"
                            value={timeEndValue}
                            onChange={(newValue) => {
                              setEndTimeValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </div>
                    <div className="col mb-3">
                      <FormControl fullWidth>
                        <Button variant="contained">Request Meet</Button>
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
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box
              sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}
            >
              <TabList
                onChange={handleTabsChange}
                aria-label="lab API tabs example"
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="inherit"
              >
                <Tab label="Meet Request" value="1" />
                <Tab label="Confirmed Meet" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="col">
                <div className="row">{showPendingRequest()}</div>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="col">
                <div className="row">{showConfirmedReq()}</div>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </SideMenu>
  );
}
