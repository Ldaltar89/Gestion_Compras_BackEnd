const { Schema, model } = require("mongoose");

const ProveedorSchema = Schema({
  nombres: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  cedula: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  ciudad: {
    type: Schema.Types.ObjectId,
    ref: "Ciudad",
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
  empresa: {
    type: Schema.Types.ObjectId,
    ref: "Empresa",
    required: true,
  },
});

module.exports = model("Proveedor", ProveedorSchema);
