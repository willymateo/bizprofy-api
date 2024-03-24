const createProvidersSchema = {
  required: ["firstNames", "lastNames", "email", "phoneNumber", "address"],
  additionalProperties: false,
  type: "object",
  properties: {
    idCard: {
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
    },
    phoneNumber: {
      type: "string",
    },
    address: {
      type: "string",
    },
  },
};

module.exports = { createProvidersSchema };
