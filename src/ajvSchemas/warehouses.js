const createWarehouseSchema = {
  required: ["name"],
  additionalProperties: false,
  type: "object",
  properties: {
    code: {
      type: "string",
    },
    name: {
      type: "string",
    },
  },
};

module.exports = { createWarehouseSchema };
