"use strict";

const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const { sequelize } = require("../connection");
const { Entities } = require("./entities");

const EntityPermissions = sequelize.define(
  "EntityPermissions",
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
    entityId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "entity_permission",
    },
    permission: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "entity_permission",
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "entity_permissions",
  },
);

EntityPermissions.belongsTo(Entities, {
  foreignKey: "entityId",
  as: "entity",
});

Entities.hasMany(EntityPermissions, {
  foreignKey: "entityId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

module.exports = { EntityPermissions };
