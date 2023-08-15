
exports.handle400 = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else next(err);
};
exports.handle404 = (req, res) => {
  res.status(404).send({ msg: "Not found" });
};
exports.handle500 = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ msg: err.msg });
  } else {
    err;
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
