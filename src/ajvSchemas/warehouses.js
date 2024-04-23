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
    q: {
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

const editWarehouseSchema = {
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

const warehouseActivationSchema = {
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
  warehouseActivationSchema,
  createWarehouseSchema,
  getWarehousesSchema,
  editWarehouseSchema,
};
