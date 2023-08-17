const format = require("pg-format");
const db = require("../db/connection");

exports.selectComments = (article_id) => {
  return db
    .query(
      `SELECT comments.*
       FROM comments
       WHERE comments.article_id = $1
       ORDER BY comments.created_at DESC`,
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};
exports.insertComments = (newComment, article_id) => {
  const { author, body } = newComment;
  return db
    .query(
      "INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;",
      [article_id, author, body]
    )
    .then(({ rows }) => rows[0]);
};

