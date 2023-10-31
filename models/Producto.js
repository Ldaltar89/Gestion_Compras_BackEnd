const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
  producto: {
    type: String,
    required: true,
  },
  proveedor: {
    type: Schema.Types.ObjectId,
    ref: "Proveedor",
  },
  precio: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  fecha_elaboracion: {
    type: Date,
    required: true,
  },
  fecha_caducacion: {
    type: Date,
    required: true,
  },
  marca: {
    type: Schema.Types.ObjectId,
    ref: "Marca",
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
  },
  lote: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  detalle_producto: {
    type: Schema.Types.ObjectId,
    ref: "DetalleProducto",
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

module.exports = model("Producto", ProductoSchema);
