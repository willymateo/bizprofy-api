"use strict";

const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const { sequelize } = require("../connection");

const SubscriptionPlans = sequelize.define(
  "SubscriptionPlans",
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
    paymentProcessorProductId: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "subscription_plans",
  },
);

module.exports = { SubscriptionPlans };
