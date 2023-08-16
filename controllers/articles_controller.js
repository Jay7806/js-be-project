const fs = require("fs/promises");
const {
  selectArticleById,
  selectArticles,
} = require("../models/articles_model");

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

exports.getArticles = (req, res, next) => {
  selectArticles()
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
