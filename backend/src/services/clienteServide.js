const { models } = require('../libs/sequelize')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')

const find = async () => {
  const Clientes = await models.Cliente.findAll({
    include:[
      "suscripcion"
    ]
  })
  return Clientes
}

const findHuella =async () =>{
  const huellas = await models.Cliente.findAll({
    include:[
      "suscripcion"
    ]
  })
  return huellas
}

const findOne = async (id) => {
  const Cliente = await models.Cliente.findByPk(id)

  if(!Cliente) throw boom.notFound('Cliente no encontrado')

  return Cliente
}

const findByCedula = async (cedula) => {
  console.log(cedula)
  const Cliente = await models.Cliente.findOne({
    where:{
      rowId:cedula
    },
    include:[
      "suscripcion"
    ]
  })
  if(!Cliente) throw boom.notFound('Cliente no encontrado')

  return Cliente
}

const findByOncaaId = async (oncaaId) => {
  console.log(oncaaId)
  const Cliente = await models.Cliente.findOne({
    where:{
      oncaaId:oncaaId
    },
    include:[
      "suscripcion"
    ]
  })
  if(!Cliente) throw boom.notFound('Cliente no encontrado')

  return Cliente
}

const create = async(body)=>{
    const newCliente = await models.Cliente.create(body)
    return newCliente  
}

const update = async (id, changes) => {
  const Cliente = await findOne(id)
  const updatedCliente = await Cliente.update(changes)

  return updatedCliente
}

const remove = async (id) => {
  const Cliente = await findOne(id)
  await Cliente.destroy(id)
  return id
}

module.exports = {
  find,
  findHuella,
  findOne,
  findByCedula,
  findByOncaaId,
  create,
  update,
  remove
}