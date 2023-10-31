const { response } = require("express");
const DetallesProducto = require("../models/DetallesProducto");

const getDetalleProducto = async (req, res = response) => {
  try {
    const detalle = await DetallesProducto.find();
    return res.status(200).json({
      ok: true,
      detalle,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const postDetalleProducto = async (req, res = response) => {
  try {
    const data = new DetallesProducto(req.body);
    const detalle = await data.save();
    return res.status(200).json({
      ok: true,
      detalle,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getDetalleProducto,
  postDetalleProducto,
};
