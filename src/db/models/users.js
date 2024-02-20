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
      comment: "PK, unique identifier.",
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
      comment: `Unique. Must contain between ${USERNAME_MIN_LENGTH}-${USERNAME_MAX_LENGTH} characters. The allow characters are letters in lowercase, numbers and underscores. It must contain at least 1 letter in lowercase.`,
    },
    passwordHash: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
      comment: "Encrypted password.",
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
      comment: "Email linked with the account. It must be unique.",
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
      comment: "The url to profile photo.",
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "users",
    comment: "Users accounts information.",
  },
);

Users.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash);
};

Users.encryptPassword = password => bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

module.exports = { Users };
