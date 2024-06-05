"use strict";
const { USER_TABLE, UserSchema} = require('../models/userModel')
const { EMPLEADOS_TABLE, EmpleadoSchema} = require('../models/empleadoModel')
const { SUSCRIPCION_TABLE, SuscripcionSchema} = require('../models/suscripcionModel')
const { CLIENTE_TABLE, ClienteSchema} = require('../models/clienteModel')
const { HORARIO_TABLE, HorarioSchema} = require('../models/horariosModel')

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(SUSCRIPCION_TABLE, SuscripcionSchema);
    await queryInterface.createTable(HORARIO_TABLE, HorarioSchema);

    await queryInterface.createTable(CLIENTE_TABLE, ClienteSchema);
    await queryInterface.createTable(EMPLEADOS_TABLE, EmpleadoSchema);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(HORARIO_TABLE);
    await queryInterface.dropTable(SUSCRIPCION_TABLE);

    await queryInterface.dropTable(CLIENTE_TABLE);
    await queryInterface.dropTable(EMPLEADOS_TABLE);
  },
};