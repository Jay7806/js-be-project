const fs = require("fs/promises");
const { selectComments, insertComments } = require("../models/comments_model");
const { selectArticleById } = require("../models/articles_model");

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const promises = [selectArticleById(article_id), selectComments(article_id)];
  Promise.all(promises)
    .then((resultPromises) => {
      res.status(200).send({ comments: resultPromises[1] });
    })
    .catch((err) => {
      next(err);
    });
};
exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const promises = [
    selectArticleById(article_id),
    insertComments(req.body, article_id),
  ];
  Promise.all(promises)
    .then((resultPromises) => {
      res.status(201).send({ comment: resultPromises[1] });
    })
    .catch((err) => {
      next(err);
    });
};

