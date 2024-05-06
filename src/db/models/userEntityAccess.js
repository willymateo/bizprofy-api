"use strict";

const { DataTypes } = require("sequelize");

const { sequelize } = require("../connection");
const { Entities } = require("./entities");
const { Users } = require("./users");

const UserEntityAccess = sequelize.define(
  "UserEntityAccess",
  {
    userId: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: "entityId_userId_unique_constraint",
    },
    entityId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: "entityId_userId_unique_constraint",
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
    tableName: "user_entity_access",
  },
);

UserEntityAccess.belongsTo(Users, {
  foreignKey: "userId",
  as: "user",
});

Users.hasMany(UserEntityAccess, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

UserEntityAccess.belongsTo(Entities, {
  foreignKey: "entityId",
  as: "entity",
});

Entities.hasMany(UserEntityAccess, {
  foreignKey: "entityId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

module.exports = { UserEntityAccess };
