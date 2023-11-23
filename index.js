const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConncetion } = require("./database/config");

console.log();

//Crear el servidor de express
const app = express();

//base de datos
dbConncetion();

//CORS
app.use(cors());

//Directorio Publico
app.use(express.static("public"));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proveedor", require("./routes/proveedor"));
app.use("/api/producto", require("./routes/producto"));
app.use("/api/marca", require("./routes/marca"));
app.use("/api/categoria", require("./routes/categoria"));
app.use("/api/ciudad", require("./routes/ciudad"));
app.use("/api/empresa", require("./routes/empresa"));
app.use("/api/rol", require("./routes/rol"));

//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor Corriendo en puerto ${process.env.PORT}`);
});
