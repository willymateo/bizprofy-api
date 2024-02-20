const notFound = (req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;

  next(error);
};

const errorHandler = (error, req, res, next) => {
  console.log(error);

  const message = error.message || "Internal server error";
  const name = error.name || "InternalServerError";
  const status = error.status || 500;

  res.status(status).send({ error: { message, name } });
};

module.exports = { notFound, errorHandler };
