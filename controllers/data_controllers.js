const fs = require("fs/promises");
const {
  selectTopics,
  insertTopic,
  selectTopicByDescription,
  selectArticleById,
} = require("../models/data_model");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};
exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getApi = (req, res) => {
  fs.readFile(`${__dirname}/../endpoints.json`, "utf-8")
    .then((dataString) => {
      const parsedData = JSON.parse(dataString);
      res.status(200).send({ data: parsedData });
    })
    .catch((error) => {
      console.log("Error reading endpoints.json:", error);
    });
};
