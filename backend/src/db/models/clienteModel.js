const { Model, DataTypes, Sequelize } = require("sequelize");
const { SUSCRIPCION_TABLE } = require("./suscripcionModel");

const CLIENTE_TABLE = "clientes";

const ClienteSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rowId:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field:'Numero de Identificacion'
  },
  nombre:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  telefono:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  oncaaId:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  plan:{
    type:DataTypes.INTEGER,
    allowNull: false,
    field: "suscripcion_id",
    references: {
        model: SUSCRIPCION_TABLE,
        key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  sexo:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  centroSalud:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  medicamentos:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  observaciones:{
    type: DataTypes.TEXT,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  base64Image: {
    type: DataTypes.TEXT,
    allowNull:true
  },
  blobImage: {
    type: DataTypes.BLOB,
    allowNull:true
  },
};

class Cliente extends Model {
  static associate(models) {
    this.belongsTo(models.Suscripcion,{
        as:'suscripcion',
        foreignKey:'suscripcion_id'
    })
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CLIENTE_TABLE,
      modelName: 'Cliente',
      timestamps: false
    }
  }
}

module.exports = {
  CLIENTE_TABLE,
  ClienteSchema,
  Cliente
}