const getCustomersSchema = {
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
    q: {
      type: "string",
    },
  },
};

const createCustomerSchema = {
  required: ["idCard", "firstNames", "lastNames", "email", "phoneNumber", "address"],
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

const editCustomerSchema = {
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

const customerActivationSchema = {
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

module.exports = {
  customerActivationSchema,
  createCustomerSchema,
  getCustomersSchema,
  editCustomerSchema,
};
