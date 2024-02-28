const getProductsSchema = {
  additionalProperties: false,
  type: "object",
  properties: {
    limit: {
      type: "number",
    },
    offset: {
      type: "number",
    },
  },
};

const createProductSchema = {
  additionalProperties: false,
  type: "object",
  required: ["code", "name", "unitPrice"],
  properties: {
    code: {
      type: "string",
    },
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    unitPrice: {
      type: "number",
    },
  },
};

module.exports = { getProductsSchema, createProductSchema };
