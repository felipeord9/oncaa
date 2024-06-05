const { models } = require("../libs/sequelize");

const find= async()=>{
    const Empleados = await models.Empleado.findAll({
        include:[
            "user",
            "horario"
        ]
    })
    return Empleados
};

const findByCedula = async (cedula) => {
    console.log(cedula)
    const Empleado = await models.Empleado.findOne({
      where:{
        rowId:cedula
      }
    })
    if(!Empleado) throw boom.notFound('Empleado no encontrado')
  
    return Empleado
  }

const create = async(body)=>{
    const newEmpleado = await models.Empleado.create(body)
    return newEmpleado   
}

const findOne = async (id) => {
    const Empleado = await models.Empleado.findByPk(id)
  
    if(!Empleado) throw boom.notFound('Empleado no encontrado')
  
    return Empleado
}

const update = async (id, changes) => {
    const Empleado = await findOne(id)
    const updatedEmpleado = await Empleado.update(changes)
  
    return updatedEmpleado
}

const remove = async(id)=>{
    const Empleado = findOne(id)
    ;(await Empleado).destroy(id)
}

module.exports={
    find,
    findByCedula,
    create,
    findOne,
    update,
    remove
}