"use strict";
import dbConfig from "../config/db.config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

export { sequelize };
