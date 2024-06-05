const express = require("express");
const ClienteController = require("../../controllers/clienteController");

const router = express.Router();

/* router.use(
  passport.authenticate('jwt', { session: false }), 
  checkRoles('admin')
)
 */
router
  .get("/", ClienteController.findAllClientes)
  .get("/:id", ClienteController.findOneCliente)
  .get("/cedula/:id", ClienteController.findOneByCedula)
  .get("/oncaa/id/:oncaaId", ClienteController.findOneByOncaaId)
  .post('/', ClienteController.createCliente)
  .patch('/:id', ClienteController.updateCliente)
  .delete('/:id', ClienteController.deleteCliente);

module.exports = router