import React, { useState, useEffect } from "react";
import SideMenu from "./SideMenu";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import gyandhan from "../api/gyandhan";
import moment from "moment";
import { Navigate, useNavigate } from "react-router-dom";

export default function BlogsList() {
  const [blogsArr, setBlogsArr] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function callBlogsAPI() {
      let res = await gyandhan.get("/blogs");
      res = res.data;
      res.forEach((element) => {
        element["created_at"] = moment(element["created_at"]).format(
          "DD-MM-YYYY H:mm:a"
        );
      });
      setBlogsArr(res);
      return () => {
        setBlogsArr([]);
      };
    }
    return callBlogsAPI();
  }, []);

  const listBlogs = () => {
    return blogsArr.map((item) => {
      return (
        <Card
          sx={{ maxWidth: 400, margin: "0.5em", cursor: "pointer" }}
          onClick={() => {
            console.log(item);
            navigate("/blogscontent", {
              state: item,
            });
          }}
        >
          <CardContent>
            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
              {item.created_at}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              ➡️
              {item.b_title}{" "}
            </Typography>
          </CardContent>
        </Card>
      );
    });
  };
  return (
    <SideMenu>
      <div className="col">
        <h1>Editorials Blogs</h1>

        <div className="row m-1">{listBlogs()}</div>
      </div>
    </SideMenu>
  );
}
