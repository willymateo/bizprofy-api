"use strict";

const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const { SubscriptionPlans } = require("./SubscriptionPlans");
const { sequelize } = require("../connection");

const SubscriptionPlanFrequencies = sequelize.define(
  "SubscriptionPlanFrequencies",
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
    subscriptionPlanId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    paymentProcessorFrequencyId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isDecimal: true,
      },
    },
    paymentProcessorUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isUrl: true,
      },
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "subscription_plan_frequencies",
  },
);

SubscriptionPlanFrequencies.belongsTo(SubscriptionPlans, {
  foreignKey: "subscriptionPlanId",
  as: "subscriptionPlan",
});

SubscriptionPlans.hasMany(SubscriptionPlanFrequencies, {
  foreignKey: "subscriptionPlanId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
  as: "subscriptionPlanFrequencies",
});

module.exports = { SubscriptionPlanFrequencies };
