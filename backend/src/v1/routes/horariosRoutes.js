const express = require("express");
const HorariosController = require("../../controllers/horariosController");

const router = express.Router();

router
  .get("/:id", HorariosController.findOneHorario)
  .patch('/:id', HorariosController.updateHorario)

module.exports = router