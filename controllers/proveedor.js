const { response, json } = require("express");
const Proveedor = require("../models/Proveedor");

const getProveedor = async (req, res = response) => {
  try {
    const proveedor = await Proveedor.find()
      .populate("ciudad")
      .populate("empresa");
    return res.status(200).json({
      ok: true,
      proveedor,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const crearProveedor = async (req, res = response) => {
  const data = req.body;
  try {
    const correoValidate = await Proveedor.findOne({ correo: data.correo });
    if (correoValidate) {
      return res.status(400).json({
        ok: false,
        msg: "El email ya existe",
      });
    }
    const proveedor = await Proveedor.create(data);
    return res.status(200).json({
      ok: true,
      proveedor,
      msg: "Creado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getIdProveedor = async (req, res = response) => {
  const id = req.params.id;
  try {
    const proveedor = await Proveedor.findById(id);
    if (!proveedor) {
      return res.status(401).json({
        ok: false,
        msg: "Error id del proveedor",
      });
    }
    return res.status(200).json({
      ok: true,
      proveedor,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarProveedor = async (req, res = response) => {
  const id = req.params.id;
  try {
    const proveedor = await Proveedor.findById(id);
    if (!proveedor) {
      return res.status(401).json({
        ok: false,
        msg: "Error id del proveedor",
      });
    }
    const { correo, ...fields } = req.body;
    if (proveedor.correo !== correo) {
      const existeEmail = await Proveedor.findOne({ correo });
      if (existeEmail) {
        return res.status(404).json({
          ok: false,
          msg: "Ya existe ese correo en el sistema",
        });
      }
    }
    fields.correo = correo;
    await Proveedor.findByIdAndUpdate(id, fields, {
      new: true,
    });
    return res.status(200).json({
      ok: true,
      msg: "Actualizado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
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
  getIdProveedor,
  actualizarProveedor,
  eliminarProveedor,
};
