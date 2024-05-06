"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "entities",
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: "",
          allowNull: false,
          primaryKey: true,
          unique: true,
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
        comment: "Entities, modules or sections of the system",
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("entities");
  },
};
