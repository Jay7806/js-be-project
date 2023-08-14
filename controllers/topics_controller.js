const {
  selectTopics,
  insertTopic,
  selectTopicByDescription,
} = require("../models/topics_model");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};
