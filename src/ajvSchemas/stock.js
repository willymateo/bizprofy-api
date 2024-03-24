const getStockSquema = {
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
    stockTypeIds: {
      type: "string",
    },
    productIds: {
      type: "string",
    },
  },
};

const createStockSquema = {
  additionalProperties: false,
  type: "object",
  required: ["stockTypeId", "warehouseId", "productId", "quantity"],
  properties: {
    stockTypeId: {
      type: "number",
    },
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

module.exports = { getStockSquema, createStockSquema };
