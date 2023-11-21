const { response } = require("express");
const Rol = require("../models/Rol");

const getRoles = async (req, res = response) => {
  try {
    const rol = await Rol.find();
    return res.status(200).json({
      ok: true,
      rol,
      msg: "Creado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const postRol = async (req, res = response) => {
  try {
    const data = new Rol(req.body);
    const rol = await data.save();
    return res.status(200).json({
      ok: true,
      rol,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getRoles,
  postRol,
};
