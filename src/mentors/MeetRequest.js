import React, { useState, useEffect, useContext } from "react";
import SideMenuMentor from "./SideMenuMentor";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import gyandhan from "../api/gyandhan";
import { Context } from "../context/AuthProvider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const daysMap = {
  monday: "1",
  tuesday: "2",
  wednesday: "3",
  thursday: "4",
  friday: "5",
  saturday: "6",
  sunday: "7",
};
export default function MeetRequest() {
  const { state } = useContext(Context);
  const [pendingReq, setPendingReq] = useState([]);
  const [confirmdReq, setConfirmedReq] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [chooseAvailDays, setChooseAvailDays] = useState([]);

  useEffect(() => {
    async function callPendingReq() {
      let res = await gyandhan.post("/mentor/studentreq", {
        mid: state.uniqueId,
      });
      res = await res.data;
      console.log(res);
      console.log(state.uniqueId);
      setPendingReq(res["pendingReq"]);
    }
    callPendingReq();
    return () => {
      setPendingReq([]);
    };
  }, []);

  const handleDaysChange = (event) => {
    const {
      target: { value },
    } = event;
    setChooseAvailDays(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const showAvailableDates = () => {
    let weekDays = selectedCard["weekdays"];
    let allAvailableDays = [];
    for (let j = 1; j <= 7; j++) {
      let e = moment().add(j, "days").format("E");
      for (let i in weekDays) {
        if (e == daysMap[weekDays[i]]) {
          e = moment().add(j, "days").format("DD-MM-YYYY dddd");
          allAvailableDays.push(e);
        }
      }
    }
    return (
      <FormControl
        variant="outlined"
        id="days"
        sx={{ minWidth: 120 }}
        fullWidth
      >
        <InputLabel id="days">Days</InputLabel>
        <Select
          id="days"
          value={chooseAvailDays}
          label="Days"
          onChange={handleDaysChange}
        >
          {allAvailableDays.map((item) => {
            return <MenuItem value={item}>{item}</MenuItem>;
          })}
        </Select>
      </FormControl>
    );
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

  const showPendingReq = () => {
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
          <CardActions>
            <Button
              variant="contained"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => {
                setSelectedCard(item);
              }}
            >
              Confirm Meet
            </Button>
          </CardActions>
        </Card>
      );
    });
  };

  const showConfirmedMeet = () => {

  };

  const confirmMeet = async (rid) => {
    const payload = {
      rid,
      mid: state.uniqueId,
      sid: "",
      sdate: moment(chooseAvailDays, "DD-MM-YYYY dddd").format("DD-MM-YYYY"),
    };
    console.log(payload);
    let res = await gyandhan.post("/mentor/accept-studentreq", payload);
    res = res.data;
    if (res.status == "success") {
      console.log("Meet request confirmd");
    }
  };

  return (
    <SideMenuMentor>
      {/* {showAvailableDates()} */}
      <div className="col mt-3">
        {/* <Button
          variant="contained"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Schedule Meet
        </Button> */}
        <h1>Meet Requests</h1>
        <div className="row m-1">{showPendingReq()}</div>
        <h1>Confirmed Meet</h1>
        <div className="row m-1">{showPendingReq()}</div>
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
                    <div className="col mb-3">{showAvailableDates()}</div>
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
                    confirmMeet(selectedCard["rid"]);
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
