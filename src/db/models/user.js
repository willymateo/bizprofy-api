"use strict";
import { intervalToDuration, isValid, parseISO } from "date-fns";
import { sequelize } from "../connection";
import { DataTypes } from "sequelize";
import { Genders } from "./genders";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import {
  saltRounds,
  USERNAME_REGEX,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "../../config/app.config";

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
    idGender: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "FK to gender.",
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

Users.belongsTo(UserRoles, {
  foreignKey: "idRole",
});

UserRoles.hasMany(Users, {
  foreignKey: "idRole",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Users.belongsTo(UserStates, {
  foreignKey: "idCurrentState",
});

UserStates.hasMany(Users, {
  foreignKey: "idCurrentState",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Users.belongsTo(Genders, {
  foreignKey: "idGender",
});

Genders.hasMany(Users, {
  foreignKey: "idGender",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

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

// Hooks
Users.beforeValidate(async (user, options) => {
  if (!user.idRole) {
    const normalRole = await UserRoles.findOne({
      where: { role: "normal" },
    });
    user.idRole = normalRole.id;
  }

  if (!user.idCurrentState) {
    const availableState = await UserStates.findOne({
      where: { state: "available" },
    });
    user.idCurrentState = availableState.id;
  }
});

Users.beforeCreate(async (user, options) => {
  if (!user.idRole) {
    const normalRole = await UserRoles.findOne({
      where: { role: "normal" },
    });
    user.idRole = normalRole.id;
  }

  if (!user.idCurrentState) {
    const availableState = await UserStates.findOne({
      where: { state: "available" },
    });
    user.idCurrentState = availableState.id;
  }
});

export { Users };
