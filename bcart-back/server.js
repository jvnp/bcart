const express = require("express");
const path = require("path");
const cors = require('cors');

var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");

var apiRouter = require("./routes/api");

const PORT = process.env.PORT || 5001;

// initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// ------ Configure swagger docs ------
const swaggerDefinition = {
  openapi: '3.0.2',
  info: {
    title: 'REST API for Wayfarer', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'This is the REST API for Wayfarer (a public bus transportation booking server.)', // short description of the app
  },
  host: 'localhost:3000', // the host or url of the app
  basePath: '/api/v1', // the basepath of your endpoint
};
var swaggerSpecs = swaggerJsdoc({
  swaggerDefinition,
  apis: [path.join(__dirname, "/routes/*.js")],
});

app.use("/api", apiRouter);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});