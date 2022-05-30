const express = require("express");
const router = express.Router();
//Ejecutamos una extensión de express donde enviara como enrutar al archivo server.js
const mongoose = require("../node_modules/mongoose"); //busca un directorio en especial
let Person = require("../models/person");
//Se inicializan las dependencias,

router.get("/", function (req, res) {
  res.render("index");
}); //Se crea una ruta raiz para cuando ingrese al localhost y esta ejecuta el index.ejs

router.get("/listPerson", (req, res, next) => {
  Person.find(function (err, person) {
    if (err) return next(err);
    res.json(person);
  });
}); //Se crea la ruta para ver el listo de registros en la coleccion

router.get("/addPerson", function (req, res) {
  res.render("person");
}); //Se crea el render con el objetivo poder ver el formulario donde podremos enviar los datos

router.post("/addPerson", function (req, res) {
  const myPerson = new Person({
    nombre: req.body.nombre,
    edad: req.body.edad,
    tipoSangre: req.body.tipoSangre,
    nss: req.body.nss,
  }); //Se creo una nueva identidad para que permita agregar a un nuevo objeto en el coleccion de MongoDB
  myPerson.save();
});
// Se crea una ruta a la cual va a poder acceder el servidor para poder observar la colección
module.exports = router;
//Se exporta el router
