const express = require("express");
const SuscripcionController = require("../../controllers/suscripcionController");

const router = express.Router();

/* router.use(
  passport.authenticate('jwt', { session: false }), 
  checkRoles('admin')
)
 */
router
  .get("/", SuscripcionController.findAllSuscripciones)
  .get("/:id", SuscripcionController.findOneSuscripcion)
  .patch('/:id', SuscripcionController.updateSuscripcion)

module.exports = router