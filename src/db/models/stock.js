"use strict";

const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const { sequelize } = require("../connection");
const { StockTypes } = require("./stockTypes");
const { Warehouses } = require("./warehouses");
const { Products } = require("./products");

const Stock = sequelize.define(
  "Stock",
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
    stockTypeId: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    warehouseId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
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
    tableName: "stock",
  },
);

Stock.belongsTo(StockTypes, {
  foreignKey: "stockTypeId",
  as: "stockType",
});

StockTypes.hasMany(Stock, {
  foreignKey: "stockTypeId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Stock.belongsTo(Products, {
  foreignKey: "productId",
  as: "product",
});

Products.hasMany(Stock, {
  foreignKey: "productId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Stock.belongsTo(Warehouses, {
  foreignKey: "warehouseId",
  as: "warehouse",
});

Warehouses.hasMany(Stock, {
  foreignKey: "warehouseId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

module.exports = { Stock };
