'use strict';
const { CLIENTE_TABLE, ClienteSchema} = require('../models/clienteModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(CLIENTE_TABLE,'base64Image',{
      type: Sequelize.DataTypes.TEXT,
      allowNull:true,
    })
    await queryInterface.addColumn(CLIENTE_TABLE,'blobImage',{
      type: Sequelize.DataTypes.BLOB,
      allowNull:true,
    })
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
