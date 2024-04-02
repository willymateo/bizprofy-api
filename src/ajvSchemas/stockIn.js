const getStockInSchema = {
  additionalProperties: false,
  type: "object",
  properties: {
    transactionDateGreaterThanOrEqualTo: {
      type: "string",
    },
    transactionDateLessThanOrEqualTo: {
      type: "string",
    },
    quantityGreaterThanOrEqualTo: {
      type: "string",
    },
    quantityLessThanOrEqualTo: {
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
    orderByField: {
      type: "string",
    },
    productIds: {
      type: "string",
    },
  },
};

const createStockInSchema = {
  additionalProperties: false,
  type: "object",
  required: ["productId", "warehouseId", "quantity", "unitCost"],
  properties: {
    productId: {
      type: "string",
    },
    warehouseId: {
      type: "string",
    },
    quantity: {
      type: "number",
    },
    unitCost: {
      type: "number",
    },
    transactionDate: {
      type: "string",
    },
  },
};

module.exports = { getStockInSchema, createStockInSchema };
