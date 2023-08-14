const express = require("express");
const app = express();
const {
  getTopics,
  postTopic,
  getTopicByDescription,
} = require("../../controllers/topics_controller");
const {getHealthCheck} = require('../../controllers/healthcheck_controller');

app.use(express.json());

app.get('/api/healthcheck', getHealthCheck);

app.get('/api/topics', getTopics);

module.exports = app;