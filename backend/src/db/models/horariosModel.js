const { Model, DataTypes, Sequelize } = require("sequelize");

const HORARIO_TABLE = "horarios";

const HorarioSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  lunesDesde: {
    type: DataTypes.STRING,
    allowNull:true
  },
  lunesHasta: {
    type: DataTypes.STRING,
    allowNull: true
  },
  MartesDesde: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  MartesHasta: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  MiercolesDesde:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  MiercolesHasta: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: Sequelize.NOW
  },
  juevesDesde:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  juevesHasta: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: Sequelize.NOW
  },
  viernesDesde:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  viernesHasta: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: Sequelize.NOW
  },
  sabadoDesde:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  sabadoHasta: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: Sequelize.NOW
  }
};

class Horario extends Model {
  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: HORARIO_TABLE,
      modelName: 'Horario',
      timestamps: false
    }
  }
}

module.exports = {
  HORARIO_TABLE,
  HorarioSchema,
  Horario
}