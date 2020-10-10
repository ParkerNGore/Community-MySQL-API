const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const database = require("./models");

const app = express();

app.use(cors());

app.use(bodyParser.json());

const port = process.env.PORT ? process.env.PORT : 3005;
app.listen(port, () => {
  console.log("Community Website API Server Started");
});
