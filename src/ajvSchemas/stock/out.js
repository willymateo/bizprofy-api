const getStockOutSchema = {
  additionalProperties: false,
  type: "object",
  properties: {
    transactionDateGreaterThanOrEqualTo: {
      type: "string",
    },
    transactionDateLessThanOrEqualTo: {
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
    warehouseIds: {
      type: "string",
    },
  },
};

const createStockOutSchema = {
  additionalProperties: false,
  type: "object",
  required: ["productId", "warehouseId", "quantity", "unitPrice"],
  properties: {
    productId: {
      type: "string",
    },
    warehouseId: {
      type: "string",
    },
    customerId: {
      type: "string",
    },
    quantity: {
      type: "number",
    },
    unitPrice: {
      type: "number",
    },
    transactionDate: {
      type: "string",
    },
  },
};

module.exports = { getStockOutSchema, createStockOutSchema };
