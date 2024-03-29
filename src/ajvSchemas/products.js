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
  required: ["productCategoryId", "providerId", "name", "unitCost", "unitPrice"],
  properties: {
    productCategoryId: {
      type: "string",
    },
    providerId: {
      type: "string",
    },
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

const getProductCategoriesSchema = {
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

const createProductCategorySchema = {
  required: ["name"],
  additionalProperties: false,
  type: "object",
  properties: {
    name: {
      type: "string",
    },
  },
};

module.exports = {
  getProductsSchema,
  createProductSchema,
  getProductCategoriesSchema,
  createProductCategorySchema,
};
