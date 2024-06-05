'use strict';
const { CLIENTE_TABLE, ClienteSchema} = require('../models/clienteModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn(CLIENTE_TABLE,'fechaNacimiento','oncaaId')
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
