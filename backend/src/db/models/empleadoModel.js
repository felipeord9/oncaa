const { Model, DataTypes, Sequelize } = require("sequelize");
const { USER_TABLE } = require("./userModel");
const { HORARIO_TABLE } = require("./horariosModel");

const EMPLEADOS_TABLE = "Empleados";

const EmpleadoSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rowId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field:'Numero de Identificacion'
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  especialidad: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefono:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  estado:{
    type: DataTypes.STRING,
    allowNull:false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
    references: {
      model: USER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  horarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "horario_id",
    references: {
      model: HORARIO_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
};

class Empleado extends Model {
  static associate(models) {
    this.belongsTo(models.User,{
        as:'user',
        foreignKey:'user_id'
    })
    this.belongsTo(models.Horario,{
      as:'horario',
      foreignKey:'horario_id'
    })
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EMPLEADOS_TABLE,
      modelName: 'Empleado',
      timestamps: false
    }
  }
}

module.exports = {
  EMPLEADOS_TABLE,
  EmpleadoSchema,
  Empleado
}