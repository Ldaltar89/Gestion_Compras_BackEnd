const { Schema, model } = require("mongoose");

const CiudadSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
});

module.exports = model("Ciudad", CiudadSchema);
