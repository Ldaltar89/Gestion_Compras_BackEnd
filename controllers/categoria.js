const { response, json } = require("express");
const {} = require("../models/Categoria");
const Categoria = require("../models/Categoria");

const crearCategoria = async (req, res = response) => {
  const categoria = new Categoria(req.body);
  try {
    const categoriaGuardada = await categoria.save();
    return res.status(200).json({
      ok: true,
      categoria: categoriaGuardada,
      msg: "Creado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getCategoria = async (req, res = response) => {
  try {
    const categoria = await Categoria.find();
    return res.status(200).json({
      ok: true,
      categoria,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  crearCategoria,
  getCategoria,
};
