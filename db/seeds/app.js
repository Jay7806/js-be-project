const express = require("express");
const fs = require("fs/promises");
const app = express();
const {
  getTopics,
  postTopic,
  getTopicByDescription,
  getApi,
  getArticlesById,
} = require("../../controllers/data_controllers");
const { getHealthCheck } = require("../../controllers/healthcheck_controller");

app.use(express.json());

app.get("/api/healthcheck", getHealthCheck);

app.get("/api/topics", getTopics);

app.get("/api", getApi);

app.get("/api/articles/:article_id", getArticlesById);

app.use((req, res) => {
    res.status(404).send({msg: 'Not found'})
});
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ msg: err.msg });
  } else {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});


module.exports = app;
