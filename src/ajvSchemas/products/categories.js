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

const editProductCategorySchema = {
  additionalProperties: false,
  type: "object",
  properties: {
    name: {
      type: "string",
    },
  },
};

const productCategoryActivationSchema = {
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
  productCategoryActivationSchema,
  createProductCategorySchema,
  getProductCategoriesSchema,
  editProductCategorySchema,
};
