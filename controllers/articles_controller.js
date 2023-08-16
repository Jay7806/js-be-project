const fs = require("fs/promises");
const {
  selectArticleById,
  selectArticles,
  selectComments,
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
exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
    const promises = [
      selectArticleById(article_id),
      selectComments(article_id),
    ];
Promise.all(promises)
     .then((resultPromises) => {
      res.status(200).send({ comments: resultPromises[1] });
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
