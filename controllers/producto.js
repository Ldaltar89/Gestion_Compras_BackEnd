const { response } = require("express");
const Producto = require("../models/Producto");

const getProducto = async (req, res = response) => {
  const producto = await Producto.find()
    .populate("user", "name")
    .populate("detalle_producto");
  res.json({
    ok: true,
    producto,
  });
};
const crearProducto = async (req, res = response) => {
  //Verificar que tenga el provedor
  const producto = new Producto(req.body);

  try {
    producto.user = req.uid;
    const productoGuardado = await producto.save();
    return res.json({
      ok: true,
      producto: productoGuardado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const actualizarProducto = async (req, res = response) => {
  const productoId = req.params.id;
  const uid = req.uid;

  try {
    const producto = await Producto.findById(productoId);
    if (!producto) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese ID",
      });
    }
    const nuevoProducto = { ...req.body };

    const productoActualizado = await Producto.findByIdAndUpdate(
      productoId,
      nuevoProducto,
      { new: true }
    );
    return res.json({
      ok: true,
      producto: productoActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const eliminarProducto = async (req, res = response) => {
  const productoId = req.params.id;
  const uid = req.uid;

  try {
    const producto = await Producto.findById(productoId);
    if (!producto) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese ID",
      });
    }

    await Producto.findByIdAndDelete(productoId);
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
  getProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
