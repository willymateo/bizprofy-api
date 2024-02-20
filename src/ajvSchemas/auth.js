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

module.exports = { loginSchema };
