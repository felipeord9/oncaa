const ClienteService = require("../services/clienteServide");
const SuscripcionService = require("../services/suscripcionService");

const findAllClientes = async (req, res, next) => {
  try {
    const data = await ClienteService.find();

    res.status(200).json({
      message: "OK",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const findOneCliente = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const data = await ClienteService.findOne(id);

    res.status(200).json({
      message: 'OK',
      data,
    });
  } catch (error) {
    next(error)
  }
};

const findOneByCedula = async (req, res, next) => {
  try {
    
    const { params: { id } } = req;
    const data = await ClienteService.findByCedula(id);

    res.status(200).json({
      message: 'OK',
      data,
    });
  } catch (error) {
    next(error)
  }
}

const findOneByOncaaId = async (req, res, next) => {
  try {
    
    const { params: { oncaaId } } = req;
    const data = await ClienteService.findByOncaaId(oncaaId);

    res.status(200).json({
      message: 'OK',
      data,
    });
  } catch (error) {
    next(error)
  }
}

const createCliente = async (req, res, next) => {
  try {
    const { body } = req
    console.log(body)
    const suscripcion = await SuscripcionService.create({
      fechaInicio:body.fechaInicio,
      fechaFinaliza:body.fechaFinaliza,
      diasFaltantes:body.diasFaltantes,
      tipo:body.tipo,
      estado:body.estado,
      valor:body.valor,
      createdAt:body.createdAt,
    })
    const data = await ClienteService.create({
      rowId:body.rowId,
      nombre:body.nombre,
      correo:body.correo,
      telefono:body.telefono,
      oncaaId:body.oncaaId,
      sexo:body.sexo,
      plan:suscripcion.id,
      centroSalud:body.centroSalud,
      medicamentos:body.medicamentos,
      observaciones:body.observaciones,
      createdAt:body.createdAt,
    })
    
    res.status(201).json({
      message: 'Created',
      data,suscripcion
    })
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}

const updateCliente = async (req, res, next) => {
  try {
    const { params: { id }, body } = req
    const data = await ClienteService.update(id, body)

    res.json(200).json({
      message: 'Updated',
      data
    })
  } catch (error) {
    next(error)
  }
}

const deleteCliente = async (req, res, next) => {
  try {
    const { params: { id }} = req
    const data = await ClienteService.remove(id)

    res.status(200).json({
      message: 'Deleted',
      data
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  findAllClientes,
  findOneCliente,
  findOneByCedula,
  findOneByOncaaId,
  createCliente,
  updateCliente,
  deleteCliente
};