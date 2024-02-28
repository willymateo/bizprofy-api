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
    // the code is not required so, validate if this field can be null
    code: {
      type: DataTypes.STRING,
      defaultValue: "",
      unique: true,
      allowNull: false,
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
});

Companies.hasMany(Products, {
  foreignKey: "companyId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

module.exports = { Products };
