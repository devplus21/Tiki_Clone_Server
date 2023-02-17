const dotenv = require("dotenv");
const express = require("express");
const database = require("./src/configs/database");
const createServer = require("./src/helpers/create_server");
const Logger = require("./src/helpers/logger");
const createSocketConnections = require("./src/helpers/websocket_connection.js");
const applyMiddlewares = require("./src/middlewares");
const errorHandler = require("./src/middlewares/error_handler");
const routes = require("./src/routes");

dotenv.config();
database.connect();

const PORT = process.env.PORT || 8080;

function lauchServer(port) {
  const app = express();
  applyMiddlewares(app);
  routes(app);
  app.use(errorHandler);

  const server = createServer(app);
  server.listen(port, () => {
    Logger.info(`App is listening at ${port}`);
  });
  createSocketConnections(server);
}

lauchServer(Number(PORT));

module.exports = lauchServer;
