const { response, json } = require("express");
const Proveedor = require("../models/Proveedor");

const getProveedor = async (req, res = response) => {
  const proveedor = await Proveedor.find()
    .populate("ciudad")
    .populate("empresa");
  res.json({
    ok: true,
    proveedor,
  });
};
const crearProveedor = async (req, res = response) => {
  //Verificar que tenga el provvedor
  const proveedor = new Proveedor(req.body);

  try {
    proveedor.user = req.uid;
    console.log(proveedor);
    const proveedorGuardado = await proveedor.save();
    res.json({
      ok: true,
      proveedor: proveedorGuardado,
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
const actualizarProveedor = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "Actualizar Proveedor",
  });
};
const eliminarProveedor = async (req, res = response) => {
  const idProveedor = req.params.id;
  const uid = req.uid;

  try {
    const proveedor = await Proveedor.findById(idProveedor);
    if (!proveedor) {
      return res.status(404).json({
        ok: false,
        msg: "Proveedor no existe con ese ID",
      });
    }

    await Proveedor.findByIdAndDelete(idProveedor);
    return res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getProveedor,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor,
};
