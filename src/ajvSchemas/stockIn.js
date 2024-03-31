const getStockInSquema = {
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

const createStockInSquema = {
  additionalProperties: false,
  type: "object",
  required: ["warehouseId", "productId", "quantity"],
  properties: {
    warehouseId: {
      type: "string",
    },
    productId: {
      type: "string",
    },
    quantity: {
      type: "number",
    },
    transactionDate: {
      type: "string",
    },
  },
};

module.exports = { getStockInSquema, createStockInSquema };
