'use strict';
const { USER_TABLE, UserSchema } = require("../models/userModel");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE,'state',{
      type: Sequelize.DataTypes.STRING,
      allowNull:true,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE,UserSchema)
  }
};
