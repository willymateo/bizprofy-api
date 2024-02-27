"use strict";
const { Sequelize } = require("sequelize");

const { NODE_ENV } = require("../config/app.config");
const dbConfig = require("../config/db");

const config = dbConfig[NODE_ENV];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

module.exports = { sequelize };
