const express = require("express");
const cors = require("cors");
const swagger = require("./docs/swagger");
const app = express();

app.use(cors());
app.use(express.json());

swagger(app);

app.use("/api", require("./routes"));
module.exports = app;