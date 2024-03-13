"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "stock_types",
      [
        {
          type: "opening_stock",
        },
        {
          type: "stock_in",
        },
        {
          type: "stock_out",
        },
        {
          type: "current_stock",
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("stock_types", null, {});
  },
};
