const { Router } = require("express");
const { getRoles, postRol } = require("../controllers/rol");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.use(validarJWT);

router.get("/", getRoles);
router.post("/", postRol);

module.exports = router;
