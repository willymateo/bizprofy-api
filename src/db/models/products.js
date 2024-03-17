"use strict";

const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const { ProductCategories } = require("./productCategories");
const { sequelize } = require("../connection");
const { Companies } = require("./companies");
const { Providers } = require("./providers");

const Products = sequelize.define(
  "Products",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
      validate: {
        isUUID: 4,
      },
    },
    companyId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    productCategoryId: {
      type: DataTypes.UUIDV4,
      allowNull: true,
    },
    providerId: {
      type: DataTypes.UUIDV4,
      allowNull: true,
    },
    code: {
      type: DataTypes.STRING,
      defaultValue: null,
      unique: true,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
    unitCost: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isDecimal: true,
      },
    },
    unitPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isDecimal: true,
      },
    },
    photoUrl: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "products",
  },
);

Products.belongsTo(Companies, {
  foreignKey: "companyId",
  as: "company",
});

Companies.hasMany(Products, {
  foreignKey: "companyId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Products.belongsTo(ProductCategories, {
  foreignKey: "productCategoryId",
  as: "productCategory",
});

ProductCategories.hasMany(Products, {
  foreignKey: "productCategoryId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Products.belongsTo(Providers, {
  foreignKey: "providerId",
  as: "provider",
});

Providers.hasMany(Products, {
  foreignKey: "providerId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

module.exports = { Products };
