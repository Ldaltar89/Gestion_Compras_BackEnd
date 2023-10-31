const { Schema, model } = require("mongoose");

const DetalleProductoSchema = Schema({
  peso: {
    type: String,
    required: true,
  },
  envase: {
    type: String,
    required: true,
  },
  tamano: {
    type: String,
    required: true,
  },
  unidad: {
    type: String,
    required: true,
  },
});

module.exports = model("DetalleProducto", DetalleProductoSchema);
