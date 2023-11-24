const jwt = require("jsonwebtoken");
require("dotenv").config();

const generarJWY = (uid, name, rol) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name, rol };
    jwt.sign(
      payload,
      process.env.SCRETE_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generarJWY,
};
