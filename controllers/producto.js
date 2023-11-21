const { response } = require("express");
const Producto = require("../models/Producto");

const getProducto = async (req, res = response) => {
  try {
    const producto = await Producto.find()
      .populate("marca")
      .populate("categoria")
      .populate("proveedor");
    return res.status(200).json({
      ok: true,
      producto,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const crearProducto = async (req, res = response) => {
  const producto = new Producto(req.body);
  try {
    const newProducto = await producto.save();
    return res.json({
      ok: true,
      producto: newProducto,
      msg: "Creado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getIdProducto = async (req, res = response) => {
  const id = req.params.id;
  try {
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(401).json({
        ok: false,
        msg: "Error id del producto",
      });
    }
    return res.status(200).json({
      ok: true,
      producto,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarProducto = async (req, res = response) => {
  const id = req.params.id;
  try {
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({
        ok: false,
        msg: "Error id del producto",
      });
    }
    const newProducto = { ...req.body };
    await Producto.findByIdAndUpdate(id, newProducto, { new: true });
    return res.json({
      ok: true,
      msg: "Actualizado correctamente",
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
  getIdProducto,
  actualizarProducto,
  eliminarProducto,
};
