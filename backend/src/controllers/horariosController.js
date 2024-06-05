const HorariosService = require("../services/horarioService");

const findOneHorario = async (req, res, next) => {
    try {
      const { params: { id } } = req;
      const data = await HorariosService.findOne(id);
  
      res.status(200).json({
        message: 'OK',
        data,
      });
    } catch (error) {
      next(error)
    }
  };
  
  const updateHorario = async (req, res, next) => {
    try {
      const { params: { id }, body } = req
      const data = await HorariosService.update(id, body)
  
      res.json(200).json({
        message: 'Updated',
        data
      })
    } catch (error) {
      next(error)
    }
  }
  
  module.exports = {
    findOneHorario,
    updateHorario,
  };
