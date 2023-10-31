const { response, json } = require("express");
const Marca = require("../models/Marca");

const crearMarca = async (req, res = response) => {
  const marca = new Marca(req.body);

  try {
    const marcaGuardada = await marca.save();
    res.json({
      ok: true,
      marca: marcaGuardada,
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

const getMarca = async (req, res = response) => {
  const marca = await Marca.find();
  res.json({
    ok: true,
    marca,
  });
};

module.exports = {
  crearMarca,
  getMarca,
};
