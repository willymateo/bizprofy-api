"use strict";

const { v4: uuidv4 } = require("uuid");
import { DataTypes } from "sequelize";

import { sequelize } from "../connection";

const StockTypes = sequelize.define(
  "StockTypes",
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isLowercase: true,
      },
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "stock_types",
  },
);

export { StockTypes };
