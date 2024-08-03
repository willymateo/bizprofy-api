const {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_REGEX,
} = require("../config/app.config");

const loginSchema = {
  required: ["emailOrUsername", "password"],
  additionalProperties: false,
  type: "object",
  properties: {
    emailOrUsername: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
};

const signUpSchema = {
  additionalProperties: false,
  type: "object",
  required: [
    "companyName",
    "countryCode",
    "countryName",
    "firstNames",
    "lastNames",
    "username",
    "password",
    "email",
  ],
  properties: {
    companyName: {
      type: "string",
    },
    countryCode: {
      type: "string",
    },
    countryName: {
      type: "string",
    },
    stateCode: {
      type: "string",
    },
    stateName: {
      type: "string",
    },
    cityCode: {
      type: "string",
    },
    cityName: {
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

const emailVerificationSchema = {
  required: ["token"],
  additionalProperties: false,
  type: "object",
  properties: {
    token: {
      type: "string",
    },
  },
};

module.exports = { loginSchema, signUpSchema, emailVerificationSchema };
