const {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_REGEX,
} = require("../config/app.config");

const createUserSchema = {
  additionalProperties: false,
  type: "object",
  required: ["companyName", "username", "password", "firstNames", "lastNames", "email"],
  properties: {
    companyName: {
      type: "string",
    },
    username: {
      type: "string",
      minLength: USERNAME_MIN_LENGTH,
      maxLength: USERNAME_MAX_LENGTH,
      pattern: USERNAME_REGEX,
    },
    password: {
      type: "string",
    },
    firstNames: {
      type: "string",
    },
    lastNames: {
      type: "string",
    },
    email: {
      type: "string",
      format: "email",
    },
    photoUrl: {
      type: "string",
      format: "url",
    },
  },
};

module.exports = { createUserSchema };
