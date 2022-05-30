const mongoose = require("mongoose");
const express = require("express");
const personsRoutes = require("./routes/person"); //Ahora para tener un archivo server más limpio se establece la ruta del archivo person el cual contendra una dirección a la cual se dirigirá al iniciar el server

mongoose.Promise = global.Promise;
const app = express();
app.use("/assets", express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(personsRoutes); // Ejecutamos el enrutador

mongoose.connect(
  `mongodb+srv://ghiguera:xzEVV8g2@micluster.qc5dx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  /*Se ingresa el código de conexion del mongodb y se le remplaza el nombre de usuario y la contraseña*/ {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully"); //Al conectarse exitosamente enviará el anterior mensaje
});

app.listen(3000);
