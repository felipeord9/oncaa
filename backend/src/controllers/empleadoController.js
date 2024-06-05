const EmpleadoService = require('../services/empleadosService')
const HorarioService = require('../services/horarioService')

const findAllEmpleados = async(req,res,next)=>{
    try{
        const data=await EmpleadoService.find()

        res.status(200).json({
            message:'OK',
            data
        })
    } catch(error){
        console.log(error)
        next(error)
    }
}

const findOneEmpleado = async (req, res, next) => {
    try {
      const { params: { id } } = req;
      const data = await EmpleadoService.findOne(id);
  
      res.status(200).json({
        message: 'OK',
        data
      })
    } catch (error) {
      next(error)
    }
  };

  const findOneByCedula = async (req, res, next) => {
    try {
      
      const { params: { id } } = req;
      const data = await EmpleadoService.findByCedula(id);
  
      res.status(200).json({
        message: 'OK',
        data,
      });
    } catch (error) {
      next(error)
    }
  }

  const updateEmpleado = async (req, res, next) => {
    try {
      const { params: { id }, body } = req
      const data = await EmpleadoService.update(id, body)
  
      res.json(200).json({
        message: 'Updated',
        data
      })
    } catch (error) {
      next(error)
    }
  }

const deleteEmpleado = async(req,res,next)=>{
    try{
        const {params:{id}}=req
        const data = await EmpleadoService.remove(id)
        res.status(200).json({
            message:'Deleted',
            data
        })
    } catch(error){
        next(error)
    }
}

module.exports = {
    findAllEmpleados,
    findOneEmpleado,
    findOneByCedula,
    updateEmpleado,
    deleteEmpleado,
}