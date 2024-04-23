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

const editProductSchema = {
  additionalProperties: false,
  type: "object",
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

const productActivationSchema = {
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
  productActivationSchema,
  createProductSchema,
  editProductSchema,
  getProductsSchema,
};
