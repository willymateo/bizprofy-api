"use strict";
const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const Companies = sequelize.define(
  "Companies",
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
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "companies",
  },
);

module.exports = { Companies };
