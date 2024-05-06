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
      "entity_permissions",
      [
        {
          entity_id: "users",
          permission: "createUser",
        },
        {
          entity_id: "users",
          permission: "updateUser",
        },
        {
          entity_id: "customers",
          permission: "createCustomer",
        },
        {
          entity_id: "customers",
          permission: "updateCustomer",
        },
        {
          entity_id: "providers",
          permission: "createProvider",
        },
        {
          entity_id: "providers",
          permission: "updateProvider",
        },
        {
          entity_id: "warehouses",
          permission: "createWarehouse",
        },
        {
          entity_id: "warehouses",
          permission: "updateWarehouse",
        },
        {
          entity_id: "products",
          permission: "createProduct",
        },
        {
          entity_id: "products",
          permission: "updateProduct",
        },
        {
          entity_id: "products",
          permission: "createProductCategory",
        },
        {
          entity_id: "products",
          permission: "updateProductCategory",
        },
        {
          entity_id: "stock",
          permission: "createStockIn",
        },
        {
          entity_id: "stock",
          permission: "createStockOut",
        },
        {
          entity_id: "stock",
          permission: "createCurrentStock",
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
      "entity_permissions",
      {
        entity_id: ["users", "customers", "providers", "warehouses", "products", "stock"],
      },
      {},
    );
  },
};
