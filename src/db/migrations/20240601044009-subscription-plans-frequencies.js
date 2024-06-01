"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "subscription_plan_frequencies",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.fn("gen_random_uuid"),
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        subscription_plan_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: "subscription_plans", // Table name.
            key: "id",
          },
          onDelete: "RESTRICT",
          onUpdate: "CASCADE",
        },
        payment_processor_frequency_id: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        alias: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        price: {
          type: Sequelize.DOUBLE,
          allowNull: false,
          defaultValue: 0,
        },
        payment_processor_url: {
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
        comment: "Subscription plan frequencies",
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("subscription_plan_frequencies");
  },
};
