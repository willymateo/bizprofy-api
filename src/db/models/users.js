"use strict";

const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const { sequelize } = require("../connection");
const { Companies } = require("./companies");
const {
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_REGEX,
} = require("../../config/app.config");

const Users = sequelize.define(
  "Users",
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
    username: {
      type: DataTypes.STRING(USERNAME_MAX_LENGTH),
      allowNull: false,
      unique: true,
      validate: {
        len: [USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH],
        is: new RegExp(USERNAME_REGEX),
        isLowercase: true,
        notEmpty: true,
        notNull: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    firstNames: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
    lastNames: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: true,
        notEmpty: true,
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
    tableName: "users",
  },
);

Users.belongsTo(Companies, {
  foreignKey: "companyId",
});

Companies.hasMany(Users, {
  foreignKey: "companyId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Users.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash);
};

module.exports = { Users };
