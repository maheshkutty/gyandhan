import React, { useContext, useState, useRef } from "react";
import SideMenuMentor from "./SideMenuMentor";
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
import gyandhan from "../api/gyandhan";
import { Context } from "../context/AuthProvider";

const mainTopics = ["geography", "maths"];
const mainDays = [
  { value: "monday", label: "monday" },
  { value: "tuesday", label: "tuesday" },
];

export default function MentorHome() {
  const [subject, setSubject] = useState([]);
  const [fixedSub, setFixedSub] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [days, setDays] = useState(mainDays);
  const [timeStartValue, setStartTimeValue] = useState(null);
  const [timeEndValue, setEndTimeValue] = useState(null);
  const { state } = useContext(Context);
  const aModal = useRef(null);

  const handleDaysChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(event.target);
    setSelectedDays(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const daysOfWeek = () => {
    return days.map((item) => {
      return <MenuItem value={item.value}>{item.label}</MenuItem>;
    });
  };

  const callAddExpertise = async () => {
    const payload = {
      mid: state.uniqueId,
      daysOfWeek: selectedDays,
      subjects: subject,
      startTime: timeStartValue.format("HH:mm"),
      endTime: timeEndValue.format("HH:mm"),
    };
    console.log(payload);
    let res = await gyandhan.post("/mentor/expertise", payload);
    res = res.data;
    console.log(res);
    if (res.status == "success") {
      aModal.current.click();
    }
  };

  return (
    <SideMenuMentor>
      <div className="col">
        <div className="d-flex">
          <div className="col">
            <div className="d-flex flex-column mt-3">
              <div className="d-flex flex-column align-items-center">
                <h1>Profile Details</h1>
                <img
                  src="/undraw_profile.svg"
                  height="200px"
                  width="200px"
                  className=""
                />
                <h1 className="mt-2">Mahesh Kutty</h1>
              </div>
              <div className="col">
                {/* <h4 className="text-center m-3">Profile Details</h4> */}
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
          <div className="col mt-3">
            <h1>You are not added following details</h1>
            <ul>
              <li>Your area of Expertise</li>
              <li>Your Timing and days of Availibility</li>
            </ul>
            <h3 className="mb-3">Click on below button to add</h3>
            <Button
              variant="contained"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Add Your Expertise
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
                      Add Your Expertise
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      ref={aModal}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="container">
                      <div className="col">
                        <div className="col mb-3">
                          <FormControl
                            variant="outlined"
                            id="subjects"
                            fullWidth
                          >
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
                              onChange={(event) => handleDaysChange(event)}
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
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
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
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
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
                      className="btn btn-primary"
                      onClick={() => {
                        callAddExpertise();
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideMenuMentor>
  );
}
