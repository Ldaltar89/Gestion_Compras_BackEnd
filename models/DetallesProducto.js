const { Schema, model } = require("mongoose");

const DetalleProductoSchema = Schema({
  peso: {
    type: String,
    required: false,
  },
  envase: {
    type: String,
    required: false,
  },
  tamano: {
    type: String,
    required: false,
  },
  unidad: {
    type: String,
    required: false,
  },
});

module.exports = model("DetalleProducto", DetalleProductoSchema);
