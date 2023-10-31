const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { crearCategoria, getCategoria } = require("../controllers/categoria");

router.post(
  "/",
  [
    check("nombre", "La categoria es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

router.get("/", getCategoria);

module.exports = router;
