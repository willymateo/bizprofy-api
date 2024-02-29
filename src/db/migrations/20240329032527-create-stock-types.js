"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "stock_types",
      {
        id: {
          type: Sequelize.SMALLINT,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false,
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
        comment: "Stock types",
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("stock_types");
  },
};
