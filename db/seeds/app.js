const express = require("express");
const fs = require("fs/promises");
const app = express();
const { getTopics } = require("../../controllers/topics_controller");
const {
  getCommentsByArticleId,
  postComment,
  deleteComment,
} = require("../../controllers/comments_controller");
const {
  getApi,
  getArticlesById,
  getArticles,
  increaseVotes,
  getAllArticles,
} = require("../../controllers/articles_controller");
const { getHealthCheck } = require("../../controllers/healthcheck_controller");
const {
  handle400,
  handle404,
  handle500,
} = require("../../controllers/errors_controller");
const { getUsers } = require("../../controllers/users_controller");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.get("/api/healthcheck", getHealthCheck);

app.get("/api/topics", getTopics);

app.get("/api", getApi);

app.get("/api/articles/:article_id", getArticlesById);

app.get("/api/articles", getAllArticles);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", increaseVotes);

app.delete("/api/comments/:comment_id", deleteComment);

app.get("/api/users", getUsers);

app.use(handle404);
app.use(handle400);
app.use(handle500);

module.exports = app;
