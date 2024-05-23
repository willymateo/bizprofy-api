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

const getProductCategoriesStockStatusSchema = {
  additionalProperties: false,
  type: "object",
  required: ["transactionDateGreaterThanOrEqualTo", "transactionDateLessThanOrEqualTo"],
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
    transactionDateGreaterThanOrEqualTo: {
      type: "string",
    },
    transactionDateLessThanOrEqualTo: {
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
  getProductCategoriesStockStatusSchema,
  productCategoryActivationSchema,
  createProductCategorySchema,
  getProductCategoriesSchema,
  editProductCategorySchema,
};
