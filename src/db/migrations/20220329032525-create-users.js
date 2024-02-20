"use strict";
const { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } = require("../../config/app.config");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "users",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.fn("gen_random_uuid"),
          allowNull: false,
          primaryKey: true,
          unique: true,
          comment: "PK, unique identifier.",
        },
        username: {
          type: Sequelize.STRING(USERNAME_MAX_LENGTH),
          allowNull: false,
          unique: true,
          comment: `Unique. Must contain between ${USERNAME_MIN_LENGTH}-${USERNAME_MAX_LENGTH} characters. The allow characters are letters in lowercase, numbers and underscores. It must contain at least 1 letter in lowercase.`,
        },
        password_hash: {
          type: Sequelize.STRING(60),
          allowNull: false,
          comment: "Encrypted password.",
        },
        first_names: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        last_names: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
          comment: "Email linked with the account. It must be unique.",
        },
        photo_url: {
          type: Sequelize.STRING,
          allowNull: true,
          comment: "The url to profile photo",
        },
        createdAt: {
          field: "created_at",
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
          comment: "The creation datetime.",
        },
        updatedAt: {
          field: "updated_at",
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
          comment: "The datetime of last modification.",
        },
        deletedAt: {
          field: "deleted_at",
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
          comment: "The datetime of deletion. Is null when is an active entry.",
        },
      },
      {
        comment: "Users accounts information.",
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
