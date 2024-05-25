"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "providers",
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
        id_card: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        company_name: {
          type: Sequelize.STRING,
          defaultValue: "",
          allowNull: false,
        },
        first_names: {
          type: Sequelize.STRING,
          defaultValue: "",
          allowNull: false,
        },
        last_names: {
          type: Sequelize.STRING,
          defaultValue: "",
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        phone_number: {
          type: Sequelize.STRING,
          defaultValue: "",
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING,
          defaultValue: "",
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
        comment: "Providers accounts information",
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("providers");
  },
};
