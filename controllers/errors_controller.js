exports.handle400 = (err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ msg: "Bad request" });
  } else next(err);
};
exports.handle404 = (err, req, res, next) => {
  if(err.code === '23503') {
        res.status(404).send({ msg: "Not found" });
  } else next(err);
  };
exports.handle500 = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ msg: err.msg });
  } else {
    err;
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
