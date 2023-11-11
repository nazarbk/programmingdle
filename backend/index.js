const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

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

//POST
app.post("/Usuarios", async (req, res) => {
  const { ip } = req.body;

  try {
    const hashedIp = await bcrypt.hash(ip, 10);

    const nuevoUsuario = new Usuario({ ip: hashedIp });

    await nuevoUsuario.save();

    res.status(201).send({ ok: true, mensaje: "Usuario creado con éxito" });
  } catch (error) {
    res.status(500).send({ ok: false, error: "Error al crear el usuario" });
  }
});

//Buscar usuario por IP
app.get("/Usuarios/:ip", async (req, res) => {
  const desencriptedIp = req.params.ip;

  try {
    const usuarios = await Usuario.find();
    const usuarioEncontrado = usuarios.find((usuario) => {
      return bcrypt.compare(desencriptedIp, usuario.ip);
    });

    if (!usuarioEncontrado) {
      return res.status(404).send({ ok: false, mensaje: "Usuario no encontrado" });
    }

    res.status(200).send({ ok: true, usuario: usuarioEncontrado });
  } catch (error) {
    res.status(500).send({ ok: false, error: "Error al buscar el usuario" });
  }
});


//Ranking de clasico
app.get("/Usuarios", (req, res) => {
  Usuario.find({
    nombre: { $ne: null },
  })
    .then((usuarios) => {
      res.status(200).send({ ok: true, usuarios });
    })
    .catch((error) => {
      res.status(500).send({ ok: false, error: "Error al obtener usuarios" });
    });
});

//actualizar usuario según ip
app.put("/Usuarios/:ip", async (req, res) => {
  const ipParametro = req.params.ip;

  try {
    // Encuentra al usuario por la IP hasheada
    const usuario = await Usuario.findOne({ ip: { $exists: true } }); // Ajusta la consulta según tu esquema

    if (!usuario) {
      return res.status(404).send({ ok: false, mensaje: "Usuario no encontrado" });
    }

    // Compara la IP proporcionada con la IP hasheada almacenada en la base de datos
    const esIgual = await bcrypt.compare(ipParametro, usuario.ip);

    if (!esIgual) {
      return res.status(404).send({ ok: false, mensaje: "Usuario no encontrado" });
    }

    // Si las IPs coinciden, actualiza el usuario
    const { nombre, clasico, haswonclasico, logro, haswonlogro, lenguaje, haswonlenguaje } = req.body;
    const updatedUsuario = await Usuario.findOneAndUpdate(
      { ip: usuario.ip },
      { nombre, clasico, haswonclasico, logro, haswonlogro, lenguaje, haswonlenguaje },
      { new: true }
    );

    res.status(200).send({ ok: true, usuario: updatedUsuario });
  } catch (error) {
    res.status(500).send({ ok: false, error: "Error al actualizar el usuario" });
  }
});

//Personajessugerencia
const personajesugerenciasSchema = new mongoose.Schema({
  _id: Number,
  nombre: String ,
  genero: String,
  ambito: String,
  adjetivo: String,
  anio: Number,
  dato: String,
  pista: String,
  pais: String
});

const Personajesugerencias = mongoose.model("Personajesugerencias", personajesugerenciasSchema, "Personajessugerencias");

// GET /personajes: función que devuelve los personajes sugeridos de la BD
app.get("/Personajessugerencias", (req, res) => {
    Personajesugerencias.find()
    .then((resultado) => {
      res.status(200).send({ ok: true, resultado: resultado });
    })
    .catch((error) => {
      res.status(500).send({ ok: false, error: "Error obteniendo personajes" });
    });
});

// POST /Personajessugerencias: función que agrega un nuevo personaje sugerido a la BD
app.post("/Personajessugerencias", async (req, res) => {
  const {
    nombre,
    genero,
    ambito,
    adjetivo,
    anio,
    dato,
    pista,
    pais
  } = req.body;

  console.log('PERSONAJE QUE VA A SER SUBIDO: ', req.body)

  try {
    const nuevoPersonaje = new Personajesugerencias({
      nombre,
      genero,
      ambito,
      adjetivo,
      anio,
      dato,
      pista,
      pais
    });

    console.log('PERSONAJE QUE VA A SER SUBIDO COMPRIBAR: ', nuevoPersonaje);

    await nuevoPersonaje.save();

    res.status(201).send({ ok: true, mensaje: "Personaje sugerido creado con éxito" });
  } catch (error) {
    res.status(500).send({ ok: false, error: "Error al crear el personaje sugerido" });
  }
});



app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});