"use strict";

const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const { sequelize } = require("../connection");
const { Companies } = require("./companies");

const Providers = sequelize.define(
  "Providers",
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
      unique: "unique_provider_company_id_id_card",
    },
    idCard: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: "unique_provider_company_id_id_card",
      validate: {
        notEmpty: true,
      },
    },
    firstNames: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastNames: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "providers",
  },
);

Providers.belongsTo(Companies, {
  foreignKey: "companyId",
  as: "company",
});

Companies.hasMany(Providers, {
  foreignKey: "companyId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

module.exports = { Providers };