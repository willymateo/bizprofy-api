"use strict";
const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");
const {
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  BCRYPT_SALT_ROUNDS,
  USERNAME_REGEX,
} = require("../../config/app.config");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
      validate: {
        isUUID: 4,
      },
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
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    lastNames: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
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
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "users",
  },
);

Users.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash);
};

Users.encryptPassword = password => bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

module.exports = { Users };
