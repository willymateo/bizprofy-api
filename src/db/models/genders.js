"use strict";
const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");

const Genders = sequelize.define(
  "Genders",
  {
    id: {
      type: DataTypes.SMALLINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
      comment: "PK, unique identifier.",
    },
    gender: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isLowercase: true,
      },
      comment:
        "Unique gender identifier. If it contains 2 or more words, they can be separate between underscores.",
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "genders",
    comment: "All genders of an user.",
  },
);

module.exports = { Genders };
