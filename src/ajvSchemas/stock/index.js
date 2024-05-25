const getStockStatusSchema = {
  additionalProperties: false,
  type: "object",
  required: ["transactionDateGreaterThanOrEqualTo", "transactionDateLessThanOrEqualTo"],
  properties: {
    order: {
      type: "string",
    },
    transactionDateGreaterThanOrEqualTo: {
      type: "string",
    },
    transactionDateLessThanOrEqualTo: {
      type: "string",
    },
  },
};

module.exports = { getStockStatusSchema };
