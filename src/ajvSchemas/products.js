const getProductsSchema = {
  additionalProperties: false,
  type: "object",
  properties: {
    q: {
      type: "string",
    },
    unitCostLessThanOrEqualTo: {
      type: "number",
    },
    unitCostGreaterThanOrEqualTo: {
      type: "number",
    },
    unitPriceLessThanOrEqualTo: {
      type: "number",
    },
    unitPriceGreaterThanOrEqualTo: {
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
  },
};

const createProductSchema = {
  additionalProperties: false,
  type: "object",
  required: ["name", "unitCost", "unitPrice"],
  properties: {
    code: {
      type: "string",
    },
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    unitCost: {
      type: "number",
    },
    unitPrice: {
      type: "number",
    },
  },
};

module.exports = { getProductsSchema, createProductSchema };
