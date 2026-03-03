const express = require("express");
const cors = require("cors");
const config = require("./config");

const app = express();

app.use(cors({ origin: config.frontendUrl }));
app.use(express.json());

app.get("/health", (req, res) => {
	res.json({
		ok: true,
		env: config.nodeEnv,
	});
});

module.exports = app;
