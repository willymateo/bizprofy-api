const getCurrentStockSchema = {
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

module.exports = { getCurrentStockSchema };
