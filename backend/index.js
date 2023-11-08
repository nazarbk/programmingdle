const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
const { ObjectId } = require("mongodb");

//mongoose.connect("mongodb+srv://nazarblancokataran:rLw4jKya6zHXocX0@cluster0.xhdituv.mongodb.net/?retryWrites=true&w=majority");
mongoose.connect("mongodb+srv://nazarblancokataran:rLw4jKya6zHXocX0@cluster0.xhdituv.mongodb.net/Programmingdle");


const app = express();
app.use(express.json());
app.use(cors());

app.set('trust proxy', true);

//Personajes
const personajeSchema = new mongoose.Schema({
_id: Number,
nombre: String ,
genero: String,
ambito: String,
adjetivo: String,
año: Number,
dato: String,
pista: String,
pais: String
});

const Personaje = mongoose.model("Personaje", personajeSchema, "Personajes");

// GET /personajes: función que devuelve los personajes de la BD
app.get("/Personajes", (req, res) => {
    Personaje.find()
    .then((resultado) => {
      res.status(200).send({ ok: true, resultado: resultado });
    })
    .catch((error) => {
      res.status(500).send({ ok: false, error: "Error obteniendo personajes" });
    });
});

//Lenguajes
const lenguajeSchema = new mongoose.Schema({
_id: Number,
lenguaje: String ,
dato: String,
pista: String
});

const Lenguaje = mongoose.model("Lenguaje", lenguajeSchema, "Lenguajes");

// GET /lenguaje: función que devuelve los lenguajes de la BD
app.get("/Lenguajes", (req, res) => {
    Lenguaje.find()
    .then((resultado) => {
      res.status(200).send({ ok: true, resultado: resultado });
    })
    .catch((error) => {
      res.status(500).send({ ok: false, error: "Error obteniendo lenguajes" });
    });
});

//IP 

app.get('/', (req, res) => {
  const ip = req.ip;
  res.send(ip);
});

//Usuarios

const usuarioSchema = new mongoose.Schema({
  ip: String,
  nombre: {
    type: String,
    default: null
  },
  clasico: {
    type: [{}],
    default: null
  },
  haswonclasico: {
    type: Boolean,
    default: false
  },
  logro: {
    type: [{}],
    default: null
  },
  haswonlogro: {
    type: Boolean,
    default: false
  },
  lenguaje: {
    type: [{}],
    default: null
  },
  haswonlenguaje: {
    type: Boolean,
    default: false
  }
});

const Usuario = mongoose.model("Usuario", usuarioSchema, "Usuarios");

app.post("/Usuarios", (req, res) => {
  const { ip } = req.body;
  const nuevoUsuario = new Usuario({ ip });

  nuevoUsuario
    .save()
    .then(() => {
      res.status(201).send({ ok: true, mensaje: "Usuario creado con éxito" });
    })
    .catch((error) => {
      res.status(500).send({ ok: false, error: "Error al crear el usuario" });
    });
});

//Buscar usuario por IP
app.get("/Usuarios/:ip", (req, res) => {
  const ip = req.params.ip;

  Usuario.findOne({ ip: ip })
    .then((usuario) => {
      if (!usuario) {
        return res.status(404).send({ ok: false, mensaje: "Usuario no encontrado" });
      }
      res.status(200).send({ ok: true, usuario });
    })
    .catch((error) => {
      res.status(500).send({ ok: false, error: "Error al buscar el usuario" });
    });
});

//Actualizar Usuario por IP
app.put("/Usuarios/:ip", (req, res) => {
  const ip = req.params.ip;

  const { nombre, intentosclasico, clasico, haswonclasico } = req.body;

  Usuario.findOneAndUpdate({ ip: ip }, { nombre, clasico, haswonclasico, logro, haswonlogro, lenguaje, haswonlenguaje }, { new: true })
    .then((usuario) => {
      if (!usuario) {
        return res.status(404).send({ ok: false, mensaje: "Usuario no encontrado" });
      }
      res.status(200).send({ ok: true, usuario });
    })
    .catch((error) => {
      res.status(500).send({ ok: false, error: "Error al actualizar el usuario" });
    });
});


app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});