const { Schema, model } = require("mongoose");

const EmpresaSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
});

module.exports = model("Empresa", EmpresaSchema);
