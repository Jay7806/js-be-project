const fs = require("fs/promises");
const { selectUsers } = require("../models/users_model");

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });    
};
