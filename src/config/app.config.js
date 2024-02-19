const MORGAN_FORMAT =
  "● [:date[iso]] [:remote-addr :remote-user] :method :url HTTP/:http-version :status :response-time ms - :res[content-length]\n";
const NODE_ENV = process.env.NODE_ENV || "development";
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 0;

module.exports = { MORGAN_FORMAT, NODE_ENV, JWT_SECRET, PORT };
