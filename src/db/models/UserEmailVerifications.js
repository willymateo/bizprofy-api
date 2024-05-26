"use strict";

const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const { sequelize } = require("../connection");
const { Users } = require("./users");

const UserEmailVerifications = sequelize.define(
  "UserEmailVerifications",
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
    userId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    token: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      validate: {
        isUUID: 4,
      },
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    activatedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "user_email_verifications",
  },
);

UserEmailVerifications.belongsTo(Users, {
  foreignKey: "userId",
  as: "user",
});

Users.hasMany(UserEmailVerifications, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
  as: "userEmailVerifications",
});

module.exports = { UserEmailVerifications };
