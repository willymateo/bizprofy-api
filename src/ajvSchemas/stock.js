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
      type: "number",
    },
    quantityLessThanOrEqualTo: {
      type: "number",
    },
    order: {
      type: "string",
    },
    limit: {
      type: "number",
    },
    offset: {
      type: "number",
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
  required: ["stockTypeId", "productId", "quantity"],
  properties: {
    stockTypeId: {
      type: "number",
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
