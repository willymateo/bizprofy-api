"use strict";

const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const { sequelize } = require("../connection");

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
      defaultValue: "",
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    countryCode: {
      type: DataTypes.STRING(3),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    countryName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    stateCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stateName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cityCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cityName: {
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
