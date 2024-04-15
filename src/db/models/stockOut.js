"use strict";

const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const { sequelize } = require("../connection");
const { Warehouses } = require("./warehouses");
const { Customers } = require("./customers");
const { Products } = require("./products");

const StockOut = sequelize.define(
  "StockOut",
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
    customerId: {
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
    unitPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isDecimal: true,
      },
    },
    currentStockAtMoment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: true,
        min: 0,
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
    tableName: "stock_out",
  },
);

StockOut.belongsTo(Products, {
  foreignKey: "productId",
  as: "product",
});

Products.hasMany(StockOut, {
  foreignKey: "productId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

StockOut.belongsTo(Warehouses, {
  foreignKey: "warehouseId",
  as: "warehouse",
});

Warehouses.hasMany(StockOut, {
  foreignKey: "warehouseId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

StockOut.belongsTo(Customers, {
  foreignKey: "customerId",
  as: "customer",
});

Customers.hasMany(StockOut, {
  foreignKey: "customerId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

module.exports = { StockOut };
