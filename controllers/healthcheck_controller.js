const { response } = require("../db/seeds/app");

exports.getHealthCheck = (request, response) => {
  response.status(200).send();
};
