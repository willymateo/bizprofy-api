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
          allowNull: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        photo_url: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        unit_price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
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
        comment: "Products accounts information.",
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  },
};
