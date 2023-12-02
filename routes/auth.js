/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
  getUsuarios,
  deleteUsuario,
  getIdUsuario,
  actualizarUsuario,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

router.get("/users", validarJWT, getUsuarios);
router.get("/renew", validarJWT, revalidarToken);

router.get("/user/:id", validarJWT, getIdUsuario);

router.post(
  "/new",
  [
    //middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("rol", "El rol es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
    validarJWT,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUsuario
);

router.put(
  "/user/:id",
  [
    //middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("rol", "El rol es obligatorio").not().isEmpty(),
    validarCampos,
    validarJWT,
  ],
  actualizarUsuario
);

router.delete("/user/:id", validarJWT, deleteUsuario);

module.exports = router;
