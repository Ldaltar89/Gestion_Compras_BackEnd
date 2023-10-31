const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { crearCiudad, getCiudad } = require("../controllers/ciudad");

router.post(
  "/",
  [check("nombre", "La ciudad es obligatoria").not().isEmpty(), validarCampos],
  crearCiudad
);

router.get("/", getCiudad);

module.exports = router;
