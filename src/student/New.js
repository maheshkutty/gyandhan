import React, { useState, useEffect } from "react";
import SideMenu from "./SideMenu";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import TextField from "@mui/material/TextField";
import FormControl from '@mui/material/FormControl'

const mainTopics = ["geography", "maths"];
const mainDays = [
  { value: "1", label: "mondays" },
  { value: "2", label: "tuesday" },
];
export default function TopicSearch() {
  const [topics, setTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestedTopics, setSuggestedTopics] = useState(mainTopics);
  const [dropDownTopics, setDropDownTopics] = useState("none");
  const [subject, setSubject] = useState(["maths"]);
  const [days, setDays] = useState(mainDays);
  const [selectedDays, setSelectedDays] = useState([]);
  const [singleTopic, setSingleTopic] = useState("");
  const [timeStartValue, setStartTimeValue] = useState(null);
  const [timeEndValue, setEndTimeValue] = useState(null);

  useEffect(() => {
    const delayBounce = setTimeout(() => {
      console.log("Called");
      if (searchTerm === "") {
        setSuggestedTopics(mainTopics);
      } else {
        let tempTopics = mainTopics.filter((item) => {
          if (item.includes(searchTerm)) {
            return item;
          }
        });
        console.log(tempTopics);
        console.log(tempTopics);
        setSuggestedTopics(tempTopics);
      }
    }, 1000);
    return () => clearTimeout(delayBounce);
  }, [searchTerm]);

  const showSubject = () => {
    return subject.map((item) => {
      return (
        <p className="d-inline topicButton justify-content-center">
          {item}{" "}
          <i
            class="fa fa-times"
            aria-hidden="true"
            onClick={(e) => {
              console.log("delete called");
              let tempSubject = subject.filter((element) => {
                if (item != element) return item;
              });
              setSubject(tempSubject);
            }}
            onMouseEnter={(e) => {
              e.target.style.cursor = "pointer";
            }}
          ></i>
        </p>
      );
    });
  };

  const showDropDownSubject = () => {
    return suggestedTopics.map((item, i) => {
      return (
        <p
          key={i}
          onMouseOver={(e) => {
            e.target.style.cursor = "pointer";
            e.target.style.backgroundColor = "grey";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "white";
          }}
          onClick={(e) => {
            console.log(e.target.innerHTML);
            if (subject.indexOf(e.target.innerHTML) < 0)
              setSubject([...subject, e.target.innerHTML]);
          }}
        >
          {item}
        </p>
      );
    });
  };

  const addTopics = () => {
    console.log(singleTopic);
    if (singleTopic != "") {
      if (topics.indexOf(singleTopic) < 0) {
        setTopics([...topics, singleTopic]);
      }
    }
  };

  const showTopics = () => {
    return topics.map((item) => {
      return (
        <p className="d-inline topicButton justify-content-center">
          {item}{" "}
          <i
            class="fa fa-times"
            aria-hidden="true"
            onClick={(e) => {
              console.log("delete called");
              let tempSubject = topics.filter((element) => {
                if (item != element) return item;
              });
              setTopics(tempSubject);
            }}
            onMouseEnter={(e) => {
              e.target.style.cursor = "pointer";
            }}
          ></i>
        </p>
      );
    });
  };

  const daysOfWeek = () => {
    return days.map((item) => {
      return <MenuItem value={parseInt(item.value)}>{item.label}</MenuItem>;
    });
  };

  const handleDaysChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedDays(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <SideMenu>
      <div className="container">
        <div>
          <h1>Schdule your meet</h1>
        </div>
        <div className="col">
          <label for="search">Enter your subject</label>
          <div className="mb-3">{showSubject()}</div>
          <input
            type="text"
            id="search"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onMouseEnter={() => {
              setDropDownTopics("block");
            }}
          />
          <div
            className="topicsContent"
            onMouseLeave={() => {
              console.log("Div focus");
              setDropDownTopics("none");
            }}
            style={{ display: dropDownTopics }}
          >
            {showDropDownSubject()}
          </div>
        </div>
        <div className="col">
          <label>Type topics</label>
          <div className="mb-3">{showTopics()}</div>
          <input
            type="text"
            id="search"
            className="form-control"
            value={singleTopic}
            onChange={(e) => setSingleTopic(e.target.value)}
          />
          <button onClick={addTopics} className="btn btn-primary">
            Add Topics
          </button>
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <TimePicker
              label="Choose Start Time"
              value={timeStartValue}
              onChange={(newValue) => {
                setStartTimeValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div>
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
        </div>
        <div className="col">
          <Select multiple value={selectedDays} onChange={handleDaysChange}>
            {daysOfWeek()}
          </Select>
        </div>
      </div>
    </SideMenu>
  );
}
