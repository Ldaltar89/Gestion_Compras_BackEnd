const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
  producto: {
    type: String,
    required: true,
  },
  proveedor: {
    type: Schema.Types.ObjectId,
    ref: "Proveedor",
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  peso: {
    type: Number,
    required: true,
  },
  envase: {
    type: String,
    required: true,
  },
  unidad: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: false,
  },
  fecha_elaboracion: {
    type: String,
    required: true,
  },
  fecha_caducacion: {
    type: String,
    required: true,
  },
  marca: {
    type: Schema.Types.ObjectId,
    ref: "Marca",
    required: true,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  lote: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

module.exports = model("Producto", ProductoSchema);
