const swaggerUi = require("swagger-ui-express");
const SwaggerParser = require("@apidevtools/swagger-parser");
const path = require("path");

module.exports = async (app) => {
	const filePath = path.join(__dirname, "openapi.yaml");
	const api = await SwaggerParser.bundle(filePath);

	app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(api));
};
