const createProductSchema = {
  additionalProperties: false,
  type: "object",
  required: ["companyId", "code", "name", "unitPrice"],
  properties: {
    companyId: {
      type: "string",
    },
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
