"use strict";

const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const { sequelize } = require("../connection");
const { Companies } = require("./companies");

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
    code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        isUrl: true,
      },
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
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
});

Companies.hasMany(Products, {
  foreignKey: "companyId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

module.exports = { Products };
