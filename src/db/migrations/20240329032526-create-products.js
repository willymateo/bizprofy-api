"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "products",
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
        code: {
          type: Sequelize.STRING,
          defaultValue: null,
          unique: true,
          allowNull: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "",
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "",
        },
        photo_url: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "",
        },
        unit_cost: {
          type: Sequelize.DOUBLE,
          allowNull: false,
          defaultValue: 0,
        },
        unit_price: {
          type: Sequelize.DOUBLE,
          allowNull: false,
          defaultValue: 0,
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
        comment: "Products accounts information",
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  },
};
