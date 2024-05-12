"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "entities",
      [
        {
          name: "users",
        },
        {
          name: "customers",
        },
        {
          name: "providers",
        },
        {
          name: "warehouses",
        },
        {
          name: "products",
        },
        {
          name: "stock",
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete(
      "entities",
      {
        name: ["users", "customers", "providers", "warehouses", "products", "stock"],
      },
      {},
    );
  },
};
