const express = require("express");
const axios = require("axios");
require("dotenv").config();
const app = express();
const path = require("path");
const cors = require("cors");

const public_path = path.join(__dirname, "build");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.sendFile(path.join(public_path, "index.html")));

app.get("/apod", (req, res) => {
  if (req.query.start_date && req.query.end_date) {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&start_date=${req.query.start_date}&end_date=${req.query.end_date}`
      )
      .then((resp) => {
        return res.send(resp.data);
      });
  } else if (req.query.start_date) {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&start_date=${req.query.start_date}`
      )
      .then((resp) => res.send(resp.data));
  } else {
    axios
      .get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
      .then((resp) => res.send(resp.data));
  }
});

app.use("/", express.static(public_path));
app.use(cors());

app.listen(port, () => console.log("server running... If in dev, go to localhost:3000..."));
