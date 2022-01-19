import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import SideMenu from "./SideMenu";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const mainTopics = ["geography", "maths"];
const classessArr = [
  {
    subject: ["Geogrpahy"],
    dateTime: "12-Mar-2021 09:00",
    topics: ["Later of earth crust", "class 8"],
    meetLink: "https://meet.google.com/wwb-omdz-fdx ",
    noStudent: "25",
    tName: "Rahul",
  },
  {
    subject: ["Geogrpahy"],
    dateTime: "12-Mar-2021 09:00",
    topics: ["Later of earth crust", "class 8"],
    meetLink: "https://meet.google.com/wwb-omdz-fdx ",
    noStudent: "25",
    tName: "Rahul",
  },
  {
    subject: ["Geogrpahy"],
    dateTime: "12-Mar-2021 09:00",
    topics: ["Later of earth crust", "class 8"],
    meetLink: "https://meet.google.com/wwb-omdz-fdx ",
    noStudent: "25",
    tName: "Rahul",
  },
  {
    subject: ["Geogrpahy"],
    dateTime: "12-Mar-2021 09:00",
    topics: ["Later of earth crust", "class 8"],
    meetLink: "https://meet.google.com/wwb-omdz-fdx ",
    noStudent: "25",
    tName: "Rahul",
  },
  {
    subject: ["Geogrpahy"],
    dateTime: "12-Mar-2021 09:00",
    topics: ["Later of earth crust", "class 8"],
    meetLink: "https://meet.google.com/wwb-omdz-fdx ",
    noStudent: "25",
    tName: "Rahul",
  },
];
export default function LiveClasses() {
  const liveClasses = () => {
    return classessArr.map((item) => {
      return (
        <Card sx={{ maxWidth: 400, margin: "0.5em" }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ color: "#676FA3" }}
              component="div"
            >
              Subject: {item.subject.join(",")}
            </Typography>
            <Typography variant="h7">Week days:</Typography>
            <Typography variant="body2" color="text.secondary">
              <Chip
                label="Sunday"
                sx={{ backgroundColor: "#FF5959", color: "white" }}
              />
            </Typography>
            <Typography variant="h7">Date:</Typography>
            <Typography variant="body2" color="text.secondary">
              {item.dateTime}
            </Typography>
            <Typography variant="h7">Topics</Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                console.log(item.meetLink);
              }}
            >
              Join Meet
            </Button>
          </CardActions>
        </Card>
      );
    });
  };

  const scheduleClasess = () => {
    return classessArr.map((item) => {
      return (
        <Card sx={{ maxWidth: 400, margin: "0.5em" }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ color: "#676FA3" }}
              component="div"
            >
              Subject: {item.subject.join(",")}
            </Typography>
            <Typography variant="h7">Week days:</Typography>
            <Typography variant="body2" color="text.secondary">
              <Chip
                label="Sunday"
                sx={{ backgroundColor: "#FF5959", color: "white" }}
              />
            </Typography>
            <Typography variant="h7">Date:</Typography>
            <Typography variant="body2" color="text.secondary">
              {item.dateTime}
            </Typography>
            <Typography variant="h7">Topics</Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                console.log(item.meetLink);
              }}
            >
              Join Meet
            </Button>
          </CardActions>
        </Card>
      );
    });
  };

  return (
    <SideMenu>
      <div>
        <div className="col">
          <h1>Live Clasess</h1>
          <div className="row">{liveClasses()}</div>
        </div>
        <div className="col">
          <h1>Upcoming Clasess</h1>
          <div className="row">{scheduleClasess()}</div>
        </div>
      </div>
    </SideMenu>
  );
}
