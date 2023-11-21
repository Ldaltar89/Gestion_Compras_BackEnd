const { response, json } = require("express");
const Ciudad = require("../models/Ciudad");

const crearCiudad = async (req, res = response) => {
  const ciudad = new Ciudad(req.body);
  try {
    const ciudadGuardada = await ciudad.save();
    return res.status(200).json({
      ok: true,
      ciudad: ciudadGuardada,
      msg: "Creado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getCiudad = async (req, res = response) => {
  try {
    const ciudad = await Ciudad.find();
    return res.status(200).json({
      ok: true,
      ciudad,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  crearCiudad,
  getCiudad,
};
