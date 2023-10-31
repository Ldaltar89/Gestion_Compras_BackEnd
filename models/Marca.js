const { Schema, model } = require("mongoose");

const MarcaSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
});

module.exports = model("Marca", MarcaSchema);
