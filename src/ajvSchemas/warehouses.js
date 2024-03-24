const getWarehousesSchema = {
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

module.exports = { createWarehouseSchema, getWarehousesSchema };
