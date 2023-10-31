const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { crearMarca, getMarca } = require("../controllers/marca");

router.post(
  "/",
  [check("nombre", "La marca es obligatorio").not().isEmpty(), validarCampos],
  crearMarca
);

router.get("/", getMarca);

module.exports = router;
