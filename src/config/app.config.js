const addFormats = require("ajv-formats");
const Ajv = require("ajv");

const ajv = new Ajv();
addFormats(ajv, ["email", "url", "date-time", "date"]);

const MORGAN_FORMAT =
  "● [:date[iso]] [:remote-addr :remote-user] :method :url HTTP/:http-version :status :response-time ms - :res[content-length]\n";
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);
const USERNAME_REGEX = "^[a-z0-9_.]*[a-z]+[a-z0-9_.]*$";
const NODE_ENV = process.env.NODE_ENV || "development";
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 0;
const USERNAME_MAX_LENGTH = 30;
const USERNAME_MIN_LENGTH = 5;

module.exports = {
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  BCRYPT_SALT_ROUNDS,
  USERNAME_REGEX,
  MORGAN_FORMAT,
  JWT_SECRET,
  NODE_ENV,
  PORT,
  ajv,
};
