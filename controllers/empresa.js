const { response } = require("express");
const Empresa = require("../models/Empresa");

const crearEmpresa = async (req, res = response) => {
  const empresa = new Empresa(req.body);
  try {
    const empresaGuardada = await empresa.save();
    return res.status(200).json({
      ok: true,
      empresa: empresaGuardada,
      msg: "Creado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getEmpresa = async (req, res = response) => {
  try {
    const empresa = await Empresa.find();
    return res.status(200).json({
      ok: true,
      empresa,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  crearEmpresa,
  getEmpresa,
};
