const { response } = require("express");
const Empresa = require("../models/Empresa");

const crearEmpresa = async (req, res = response) => {
  const empresa = new Empresa(req.body);
  try {
    const empresaGuardada = await empresa.save();
    res.json({
      ok: true,
      empresa: empresaGuardada,
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

const getEmpresa = async (req, res = response) => {
  const empresa = await Empresa.find();
  res.json({
    ok: true,
    empresa,
  });
};

module.exports = {
  crearEmpresa,
  getEmpresa,
};
