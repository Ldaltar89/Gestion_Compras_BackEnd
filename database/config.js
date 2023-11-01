const mongoose = require("mongoose");

const dbConncetion = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      dbName: "gestion_compras",
    });
    console.log("DB online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de inicializar BD");
  }
};

module.exports = {
  dbConncetion,
};
