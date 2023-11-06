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

app.get('/', (req, res) => {
  const ip = req.ip;
  res.send(`Tu dirección IP es: ${ip}`);
});

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});