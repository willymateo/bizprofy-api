"use strict";

const { DataTypes } = require("sequelize");

const { sequelize } = require("../connection");

const StockTypes = sequelize.define(
  "StockTypes",
  {
    id: {
      type: DataTypes.SMALLINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isLowercase: true,
      },
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "stock_types",
  },
);

module.exports = { StockTypes };
