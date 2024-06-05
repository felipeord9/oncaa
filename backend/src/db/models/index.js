const { User, UserSchema } = require('./userModel')
const { Empleado, EmpleadoSchema } = require('./empleadoModel')
const { Suscripcion, SuscripcionSchema } = require('./suscripcionModel')
const { Cliente, ClienteSchema } = require('./clienteModel')
const { Horario, HorarioSchema } = require('./horariosModel')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Empleado.init(EmpleadoSchema, Empleado.config(sequelize))
  Suscripcion.init(SuscripcionSchema, Suscripcion.config(sequelize))
  Cliente.init(ClienteSchema, Cliente.config(sequelize))
  Horario.init(HorarioSchema, Horario.config(sequelize))


  User.associate(sequelize.models)
  Empleado.associate(sequelize.models)
  Suscripcion.associate(sequelize.models)
  Cliente.associate(sequelize.models)
  Horario.associate(sequelize.models)

}
module.exports = setupModels