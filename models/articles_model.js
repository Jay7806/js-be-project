const format = require("pg-format");
const db = require("../db/connection");

exports.selectArticleById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      } else {
        return rows;
      }
    });
};
exports.selectArticles = () => {
  return db
    .query(
      `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, 
       COUNT(comments.comment_id) AS comment_count 
       FROM articles
       LEFT JOIN comments ON articles.article_id = comments.article_id 
       GROUP BY articles.article_id
       ORDER BY created_at DESC`
    )
    .then(({ rows }) => {
      return rows;
    })
    .catch((err) => {
      throw err;
    });
};
exports.updateVotes = (inc_votes, article_id) => {
  return db
    .query(
      `UPDATE articles
       SET votes = votes + $1
       WHERE article_id = $2
       RETURNING *;`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
exports.selectAllArticles = (topic, sortBy = "created_at", orderBy = "DESC") => {
let queryStr = 'SELECT * FROM articles';
let queryValues = [];

if (topic) {
  queryValues.push(topic);
  queryStr += ` WHERE articles.topic = $1`;
 
}
  return db
  .query(queryStr, queryValues)
      .then(({ rows }) => {
      console.log(rows, 'row');
      return rows; 
    })
    .catch((err) => {
      throw err;
    });
};



