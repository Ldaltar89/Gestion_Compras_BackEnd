const { Router } = require("express");
const {
  getDetalleProducto,
  postDetalleProducto,
} = require("../controllers/detalle_producto");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();

router.use(validarJWT);

router.get("/", getDetalleProducto);
router.post(
  "/",
  [
    check("peso", "El peso es obligatorio").not().isEmpty(),
    check("envase", "El envase es obligatorio").not().isEmpty(),
    check("tamano", "El tamano es obligatorio").not().isEmpty(),
    check("unidad", "El peso es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  postDetalleProducto
);

module.exports = router;
