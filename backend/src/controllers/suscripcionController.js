const ClienteService = require("../services/clienteServide");
const SuscripcionService = require("../services/suscripcionService");

const findAllSuscripciones = async (req, res, next) => {
  try {
    const data = await SuscripcionService.find();

    res.status(200).json({
      message: "OK",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const findOneSuscripcion = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const data = await SuscripcionService.findOne(id);

    res.status(200).json({
      message: 'OK',
      data,
    });
  } catch (error) {
    next(error)
  }
};

const updateSuscripcion = async (req, res, next) => {
  try {
    const { params: { id }, body } = req
    const data = await SuscripcionService.update(id, body)

    res.json(200).json({
      message: 'Updated',
      data
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  findAllSuscripciones,
  findOneSuscripcion,
  updateSuscripcion,
};