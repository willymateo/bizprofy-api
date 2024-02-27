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

module.exports = { createProductSchema };
