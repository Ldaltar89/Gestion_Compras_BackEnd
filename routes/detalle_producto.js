const { Router } = require("express");
const {
  getDetalleProducto,
  postDetalleProducto,
} = require("../controllers/detalle_producto");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.use(validarJWT);

router.get("/", getDetalleProducto);
router.post("/", postDetalleProducto);

module.exports = router;
