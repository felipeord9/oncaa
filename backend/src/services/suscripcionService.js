const { models } = require("../libs/sequelize");

const find = async()=>{
    const Suscripciones = await models.Suscripcion.findAll({
        include:[
            "cliente"
        ],
    })
    return Suscripciones
};

const create = async(body)=>{
    const newSuscripcion = await models.Suscripcion.create(body)
    return newSuscripcion  
}

const findOne = async (id) => {
    const Suscripcion = await models.Suscripcion.findByPk(id)
  
    if(!Suscripcion) throw boom.notFound('Suscripcion no encontrado')
  
    return Suscripcion
}

const remove = async(id)=>{
    const Suscripcion = findOne(id)
    ;(await Suscripcion).destroy(id)
}

const update = async (id, changes) => {
    console.log(changes)
    const Suscripcion = await findOne(id)
    const updatedSuscripcion = await Suscripcion.update(changes)
  
    return updatedSuscripcion
  }

module.exports={
    find,
    findOne,
    create,
    update,
    remove
}