"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "entity_permissions",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.fn("gen_random_uuid"),
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        entity_id: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: "entities", // Table name.
            key: "name",
          },
          onDelete: "RESTRICT",
          onUpdate: "CASCADE",
        },
        permission: {
          type: Sequelize.STRING,
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
        comment: "Entity permissions",
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("entity_permissions");
  },
};
