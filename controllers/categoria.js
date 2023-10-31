const { response, json } = require("express");
const {} = require("../models/Categoria");
const Categoria = require("../models/Categoria");

const crearCategoria = async (req, res = response) => {
  const categoria = new Categoria(req.body);

  try {
    const categoriaGuardada = await categoria.save();
    res.json({
      ok: true,
      categoria: categoriaGuardada,
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

const getCategoria = async (req, res = response) => {
  const categoria = await Categoria.find();
  res.json({
    ok: true,
    categoria,
  });
};

module.exports = {
  crearCategoria,
  getCategoria,
};
