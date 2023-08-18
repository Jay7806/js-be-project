const fs = require("fs/promises");
const {
  selectComments,
  insertComments,
  removeCommentById,
} = require("../models/comments_model");
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
  insertComments(req.body, article_id)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      if (err.message === "Not found") {
        return res.status(404).json({ msg: "Not found" });
      }
      next(err);
    });
};
