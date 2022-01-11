const express = require("express");
const axios = require("axios");
const axiosRetry = require("axios-retry");
require("dotenv").config();
const app = express();
const path = require("path");
const cors = require("cors");

axiosRetry(axios);

const public_path = path.join(__dirname, "build");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.sendFile(path.join(public_path, "index.html")));

app.get("/apod", (req, res) => {
  const params = {
    ...(req.query.start_date && { start_date: req.query.start_date }),
    ...(req.query.start_date &&
      req.query.end_date && { end_date: req.query.end_date }),
  };

  axios
    .get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`, {
      params: params,
      timeout: 29000
    })
    .then((resp) => {
        res.set('Content-Type', 'application/json');
        return res.send(resp.data)})
    .catch((err) => {
      const errorString =
        "Failed to obtain pictures of the day from the NASA API. Please try again later.";
      console.error(errorString);
      res.set('Content-Type', 'text/plain');
      res.status(500).send(errorString);
    });
});

app.use("/", express.static(public_path));
app.use(cors());

app.listen(port, () =>
  console.log("server running... If in dev, go to localhost:3000...")
);
