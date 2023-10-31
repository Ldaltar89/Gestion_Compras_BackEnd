const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { crearEmpresa, getEmpresa } = require("../controllers/empresa");

router.post(
  "/",
  [check("nombre", "La empresa es obligatorio").not().isEmpty(), validarCampos],
  crearEmpresa
);

router.get("/", getEmpresa);

module.exports = router;
