/*
    Producto Routes
    host + /api/Producto
*/

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const { isDate } = require("../helpers/isDate");
const {
  getProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  getIdProducto,
} = require("../controllers/producto");
const { validarJWT } = require("../middlewares/validar-jwt");

//Todas tienen que pasar por la validación de Obtener
router.use(validarJWT);

//Obtener Producto
router.get("/", getProducto);

//Obtener Id Producto
router.get("/:id", getIdProducto);

//Crear un nuevo Producto
router.post(
  "/",
  [
    check("producto", "El Producto es obligatorio").not().isEmpty(),
    check("proveedor", "El proveedor es obligatorio").not().isEmpty(),
    check("precio", "El precio es obligatorio").not().isEmpty(),
    check("peso", "El peso es obligatorio").not().isEmpty(),
    check("envase", "El envase es obligatorio").not().isEmpty(),
    check("unidad", "La unidad es obligatorio").not().isEmpty(),
    check("fecha_elaboracion", "La fecha de elaboracion es obligatoria").custom(
      isDate
    ),
    check("fecha_caducacion", "La fecha de caducacion es obligatoria").custom(
      isDate
    ),
    check("marca", "La marca es obligatorio").not().isEmpty(),
    check("categoria", "La categoria es obligatoria").not().isEmpty(),
    check("lote", "El lote es obligatorio").not().isEmpty(),
    check("stock", "El stock es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearProducto
);

//Actualizar Producto
router.put(
  "/:id",
  [
    check("producto", "El Producto es obligatorio").not().isEmpty(),
    check("proveedor", "El proveedor es obligatorio").not().isEmpty(),
    check("precio", "El precio es obligatorio").not().isEmpty(),
    check("descripcion", "La descripción es obligatoria").not().isEmpty(),
    check("fecha_elaboracion", "La fecha de elaboracion es obligatoria").custom(
      isDate
    ),
    check("fecha_caducacion", "La fecha de caducacion es obligatoria").custom(
      isDate
    ),
    check("marca", "La marca es obligatorio").not().isEmpty(),
    check("categoria", "La categoria es obligatoria").not().isEmpty(),
    check("lote", "El lote es obligatorio").not().isEmpty(),
    check("stock", "El stock es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarProducto
);

//Borrar Producto
router.delete("/:id", eliminarProducto);

module.exports = router;
