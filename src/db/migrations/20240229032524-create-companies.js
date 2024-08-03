"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "companies",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.fn("gen_random_uuid"),
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        name: {
          type: Sequelize.STRING,
          defaultValue: "",
          allowNull: false,
        },
        country_code: {
          type: Sequelize.STRING(3),
          allowNull: false,
        },
        country_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        country_state_code: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        country_state_name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        city_name: {
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
        comment: "Companies information",
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("companies");
  },
};
