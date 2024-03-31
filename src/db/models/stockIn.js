"use strict";

const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const { sequelize } = require("../connection");
const { Warehouses } = require("./warehouses");
const { Providers } = require("./providers");
const { Products } = require("./products");

const StockIn = sequelize.define(
  "StockIn",
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
    productId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    warehouseId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    providerId: {
      type: DataTypes.UUIDV4,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: true,
        min: 0,
      },
    },
    unitCost: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isDecimal: true,
      },
    },
    transactionDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "stock_in",
  },
);

StockIn.belongsTo(Products, {
  foreignKey: "productId",
  as: "product",
});

Products.hasMany(StockIn, {
  foreignKey: "productId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

StockIn.belongsTo(Warehouses, {
  foreignKey: "warehouseId",
  as: "warehouse",
});

Warehouses.hasMany(StockIn, {
  foreignKey: "warehouseId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

StockIn.belongsTo(Providers, {
  foreignKey: "providerId",
  as: "provider",
});

Providers.hasMany(StockIn, {
  foreignKey: "providerId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

module.exports = { StockIn };
