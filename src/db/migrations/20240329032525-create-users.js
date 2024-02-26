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
        },
        company_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: "companies", // Table name.
            key: "id",
          },
          onDelete: "RESTRICT",
          onUpdate: "CASCADE",
        },
        username: {
          type: Sequelize.STRING(USERNAME_MAX_LENGTH),
          allowNull: false,
          unique: true,
        },
        password_hash: {
          type: Sequelize.STRING(60),
          allowNull: false,
        },
        first_names: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        last_names: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        photo_url: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        createdAt: {
          field: "created_at",
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
        },
        updatedAt: {
          field: "updated_at",
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
        },
        deletedAt: {
          field: "deleted_at",
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
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
