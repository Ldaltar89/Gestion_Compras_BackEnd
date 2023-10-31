/*
    Proveedor Routes
    host + /api/proveedor
*/

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getProveedor,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor,
} = require("../controllers/proveedor");
const { validarJWT, validarROLE } = require("../middlewares/validar-jwt");

//Todas tienen que pasar por la validación de Obtener
router.use(validarJWT);

//Obtener Eventos
router.get("/", validarROLE, getProveedor);

//Crear un nuevo Evento
router.post(
  "/",
  [
    validarROLE,
    check("nombres", "Los nombres son obligatorios").not().isEmpty(),
    check("apellidos", "Los apellidos son obligatorios").not().isEmpty(),
    check("cedula", "La cedula es obligatoria").not().isEmpty(),
    check("telefono", "El telefono es obligatorio").not().isEmpty(),
    check("ciudad", "La ciudad es obligatorio").not().isEmpty(),
    check("direccion", "la direccion es obligatoria").not().isEmpty(),
    check("correo", "El correo es obligatorio").isEmail(),
    check("empresa", "La empresa es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  crearProveedor
);

//Actualizar Evento
router.put("/:id", validarROLE, actualizarProveedor);

//Borrar evento
router.delete("/:id", validarROLE, eliminarProveedor);

module.exports = router;
