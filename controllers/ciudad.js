const { response, json } = require("express");
const Ciudad = require("../models/Ciudad");

const crearCiudad = async (req, res = response) => {
  const ciudad = new Ciudad(req.body);

  try {
    const ciudadGuardada = await ciudad.save();
    res.json({
      ok: true,
      ciudad: ciudadGuardada,
    });
  } catch (error) {
    console.log(error);
    res.status(500),
      json({
        ok: false,
        msg: "Hable con el administrador",
      });
  }
};

const getCiudad = async (req, res = response) => {
  const ciudad = await Ciudad.find();
  res.json({
    ok: true,
    ciudad,
  });
};

module.exports = {
  crearCiudad,
  getCiudad,
};
