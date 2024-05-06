"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "user_entity_access",
      {
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "users", // Table name.
            key: "id",
          },
          onDelete: "RESTRICT",
          onUpdate: "CASCADE",
        },
        entity_id: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "entities", // Table name.
            key: "name",
          },
          onDelete: "RESTRICT",
          onUpdate: "CASCADE",
        },
        has_access: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
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
        comment: "User entity access",
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_entity_access");
  },
};
