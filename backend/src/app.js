const express = require("express");
const cors = require("cors");
const config = require("./config");

const app = express();

app.use(cors({ origin: config.frontendUrl }));
app.use(express.json());

app.use("/api", require("./routes"));
module.exports = app;