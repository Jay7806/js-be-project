const express = require("express");
const fs = require("fs/promises");
const app = express();
const {
  getTopics,
  postTopic,
  getTopicByDescription,
  getApi,
} = require("../../controllers/topics_controller");
const { getHealthCheck } = require("../../controllers/healthcheck_controller");

app.use(express.json());

app.get("/api/healthcheck", getHealthCheck);

app.get("/api/topics", getTopics);

app.get("/api", getApi);

module.exports = app;
