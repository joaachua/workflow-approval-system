const config = require("./config");
const app = require("./app");

app.listen(config.port, () => {
	console.log(`API running on ${config.appUrl} (${config.nodeEnv})`);
});
