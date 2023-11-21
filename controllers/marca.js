const { response, json } = require("express");
const Marca = require("../models/Marca");

const crearMarca = async (req, res = response) => {
  const marca = new Marca(req.body);
  try {
    const marcaGuardada = await marca.save();
    return res.status(200).json({
      ok: true,
      marca: marcaGuardada,
      msg: "Creado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getMarca = async (req, res = response) => {
  try {
    const marca = await Marca.find();
    return res.status(200).json({
      ok: true,
      marca,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  crearMarca,
  getMarca,
};
