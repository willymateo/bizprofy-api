"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "user_entity_permissions",
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
        entity_permission_id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "entity_permissions", // Table name.
            key: "id",
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
        comment: "User entity permissions",
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_entity_permissions");
  },
};
