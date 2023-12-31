const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const validarJWT = (req, res = response, next) => {
  //x-token headers
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid, name, rol } = jwt.verify(token, process.env.SCRETE_JWT_SEED);

    req.uid = uid;
    req.name = name;
    req.rol = rol;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }

  next();
};

const validarROLE = async (req, res = response, next) => {
  const uid = req.uid;
  try {
    const usuario = await Usuario.findById(uid).populate("rol", "nombre");
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no existe",
      });
    }
    if (usuario.rol.nombre !== "Administrador") {
      return res.status(403).json({
        ok: false,
        msg: "No tiene privilegios",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = { validarJWT, validarROLE };
