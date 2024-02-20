"use strict";
const { intervalToDuration, isValid, parseISO } = require("date-fns");
const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");
const {
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_REGEX,
  saltRounds,
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
    bornDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "Born date to identify if the user is of legal age",
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

Users.encryptPassword = password => bcrypt.hash(password, saltRounds);

Users.isOfLegalAge = bornDateString => {
  const bornDate = parseISO(bornDateString);
  if (!isValid(bornDate)) {
    return false;
  }

  const { years } = intervalToDuration({
    start: bornDate,
    end: new Date(),
  });

  return years >= 18;
};

module.exports = { Users };
