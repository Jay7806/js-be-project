const fs = require("fs/promises");
const {
  selectArticleById,
  selectArticles,
  updateVotes,
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
      next(error);
    });
};
exports.increaseVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  if (typeof inc_votes !== "number") {
    return res.status(404).json({ msg: "Not found" });
  }
  updateVotes(inc_votes, article_id)
    .then((votes) => {
      if (votes === undefined) {
        return res.status(404).json({ msg: "Not found" });
      }
      res.status(200).send({ votes });
    })
    .catch((err) => {
      next(err);
    });
};
