"use strict";

const { DataTypes } = require("sequelize");

const { EntityPermissions } = require("./entityPermissions");
const { sequelize } = require("../connection");
const { Users } = require("./users");

const UserEntityPermissions = sequelize.define(
  "UserEntityPermissions",
  {
    userId: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    entityPermissionId: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    hasAccess: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "user_entity_permissions",
  },
);

UserEntityPermissions.belongsTo(Users, {
  foreignKey: "userId",
  as: "user",
});

Users.hasMany(UserEntityPermissions, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
  as: "userEntityPermissions",
});

UserEntityPermissions.belongsTo(EntityPermissions, {
  foreignKey: "entityPermissionId",
  as: "entityPermission",
});

EntityPermissions.hasMany(UserEntityPermissions, {
  foreignKey: "entityPermissionId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
  as: "userEntityPermissions",
});

module.exports = { UserEntityPermissions };
