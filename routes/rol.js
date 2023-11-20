const { Router } = require("express");
const { check } = require("express-validator");
const { getRoles, postRol } = require("../controllers/rol");
const { validarJWT, validarROLE } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.use(validarJWT);

router.get("/", validarJWT, getRoles);
router.post(
  "/",
  [check("nombre", "El rol es obligatorio").not().isEmpty(), validarCampos],
  postRol
);

module.exports = router;
