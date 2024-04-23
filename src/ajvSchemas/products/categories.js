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

module.exports = {
  createProductCategorySchema,
  getProductCategoriesSchema,
  editProductCategorySchema,
};
