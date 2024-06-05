const { models } = require("../libs/sequelize");

const find=()=>{
    const Horarios = models.Horario.findAll({
    })
    return Horarios
};

const create = async(body)=>{
    const newHorarios = await models.Horario.create(body)
    return newHorarios  
}

const findOne = async (id) => {
    const Horario = await models.Horario.findByPk(id)
  
    if(!Horario) throw boom.notFound('Horario no encontrado')
  
    return Horario
}

const update = async (id, changes) => {
    const Horario = await findOne(id)
    const updatedHorario = await Horario.update(changes)
  
    return updatedHorario
}

const remove = async(id)=>{
    const Horario = findOne(id)
    ;(await Horario).destroy(id)
}

module.exports={
    find,
    create,
    findOne,
    update,
    remove
}