"use strict";

const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const { SubscriptionPlanFrequencies } = require("./SubscriptionPlanFrequencies");
const { sequelize } = require("../connection");
const { Users } = require("./users");

const UserSubscriptions = sequelize.define(
  "UserSubscriptions",
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
    subscriptionPlanFrequencyId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    startsAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endsAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    renewsAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "user_subscriptions",
  },
);

UserSubscriptions.belongsTo(Users, {
  foreignKey: "userId",
  as: "user",
});

Users.hasMany(UserSubscriptions, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
  as: "userSubscriptions",
});

UserSubscriptions.belongsTo(SubscriptionPlanFrequencies, {
  foreignKey: "subscriptionPlanFrequencyId",
  as: "subscriptionPlanFrequency",
});

SubscriptionPlanFrequencies.hasMany(UserSubscriptions, {
  foreignKey: "subscriptionPlanFrequencyId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
  as: "userSubscriptions",
});

module.exports = { UserSubscriptions };
