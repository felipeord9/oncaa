const { Model, DataTypes, Sequelize } = require("sequelize");

const SUSCRIPCION_TABLE = "suscripciones";

const SuscripcionSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull:true
  },
  fechaFinaliza: {
    type: DataTypes.DATE,
    allowNull: true
  },
  /* clienteId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "cliente_id",
    references: {
      model: CLIENTE_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  }, */
  diasFaltantes:{
    type:DataTypes.INTEGER,
    allowNull:true,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
};

class Suscripcion extends Model {
  static associate(models) {
    /* this.belongsTo(models.Cliente,{
      as:'cliente',
      foreignKey:'cliente_id'
  }) */
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SUSCRIPCION_TABLE,
      modelName: 'Suscripcion',
      timestamps: false
    }
  }
}

module.exports = {
  SUSCRIPCION_TABLE,
  SuscripcionSchema,
  Suscripcion
}