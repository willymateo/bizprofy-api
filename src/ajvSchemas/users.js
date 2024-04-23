const {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_REGEX,
} = require("../config/app.config");

const getUsersSchema = {
  additionalProperties: false,
  type: "object",
  required: [],
  properties: {
    orderByField: {
      type: "string",
    },
    order: {
      type: "string",
    },
    limit: {
      type: "string",
    },
    offset: {
      type: "string",
    },
  },
};

const createUserSchema = {
  additionalProperties: false,
  type: "object",
  required: ["username", "password", "firstNames", "lastNames", "email"],
  properties: {
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

const editUserSchema = {
  additionalProperties: false,
  type: "object",
  properties: {
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

const userActivationSchema = {
  additionalProperties: false,
  type: "object",
  properties: {
    activate: {
      type: "boolean",
    },
    force: {
      type: "boolean",
    },
  },
};

module.exports = { createUserSchema, getUsersSchema, editUserSchema, userActivationSchema };
