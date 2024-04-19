"use strict";

const { DataTypes } = require("sequelize");

const { sequelize } = require("../connection");
const { Warehouses } = require("./warehouses");
const { Products } = require("./products");

// delete the id, the new PK will be the combination of productId and warehouseId

const CurrentStock = sequelize.define(
  "CurrentStock",
  {
    productId: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    warehouseId: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
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
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "current_stock",
  },
);

CurrentStock.belongsTo(Products, {
  foreignKey: "productId",
  as: "product",
});

Products.hasMany(CurrentStock, {
  foreignKey: "productId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

CurrentStock.belongsTo(Warehouses, {
  foreignKey: "warehouseId",
  as: "warehouse",
});

Warehouses.hasMany(CurrentStock, {
  foreignKey: "warehouseId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
  as: "currentStock",
});

module.exports = { CurrentStock };
