const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWY } = require("../helpers/jwt");
const Rol = require("../models/Rol");

const getUsuarios = async (req, res = response) => {
  try {
    const usuario = await Usuario.find().populate("rol");
    return res.status(200).json({
      ok: true,
      usuario,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe",
      });
    }
    usuario = new Usuario(req.body);
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();
    return res.status(201).json({
      ok: true,
      usuario,
      msg: "Creado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador.",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email }).populate("rol", "nombre");
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese email",
      });
    }

    //Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }

    //Generar nuestro JWT
    const token = await generarJWY(
      usuario.id,
      usuario.name,
      usuario.rol.nombre
    );

    return res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      rol: usuario.rol.nombre,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador.",
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const { uid, name, rol } = req;

  //generar un nuevo JWR y retornarlo a esta peticion.
  //Generar nuestro JWT
  const token = await generarJWY(uid, name, rol);

  return res.status(200).json({
    ok: true,
    uid,
    name,
    rol,
    token,
  });
};

const deleteUsuario = async (req, res = response) => {
  const idUsuario = req.params.id;
  try {
    const usuario = await Usuario.findById(idUsuario);
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no existe por ese ID",
      });
    }

    await Usuario.findByIdAndDelete(idUsuario);
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
  crearUsuario,
  loginUsuario,
  revalidarToken,
  getUsuarios,
  deleteUsuario,
};
