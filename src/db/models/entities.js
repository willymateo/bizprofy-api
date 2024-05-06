"use strict";

const { DataTypes } = require("sequelize");

const { sequelize } = require("../connection");

const Entities = sequelize.define(
  "Entities",
  {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
      defaultValue: "",
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "entities",
  },
);

module.exports = { Entities };
