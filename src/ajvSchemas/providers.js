const getProvidersSchema = {
  additionalProperties: false,
  type: "object",
  required: [],
  properties: {
    q: {
      type: "string",
    },
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

const createProvidersSchema = {
  required: ["companyName", "firstNames", "lastNames", "email", "phoneNumber", "address"],
  additionalProperties: false,
  type: "object",
  properties: {
    idCard: {
      type: "string",
    },
    companyName: {
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

module.exports = { createProvidersSchema, getProvidersSchema };
