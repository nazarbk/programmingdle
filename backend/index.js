const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const secretKey = 'SecretKeyProgrammingdle';

//mongoose.connect("mongodb+srv://nazarblancokataran:rLw4jKya6zHXocX0@cluster0.xhdituv.mongodb.net/?retryWrites=true&w=majority");
mongoose.connect("mongodb+srv://nazarblancokataran:rLw4jKya6zHXocX0@cluster0.xhdituv.mongodb.net/Programmingdle");

const app = express();
app.use(express.json());
app.use(cors());

app.set('trust proxy', true);

//Personajes
const personajeSchema = new mongoose.Schema({
nombre: String ,
genero: String,
ambito: String,
adjetivo: String,
año: Number,
dato: String,
pista: String,
pais: String,
deldia: {
  type: Boolean,
  default: false
},
deldialogro: {
  type: Boolean,
  default: false
},
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

//post
app.post("/Personajes", async (req, res) => {
  const {
    nombre,
    genero,
    ambito,
    adjetivo,
    año,
    dato,
    pista,
    pais
  } = req.body;

  try {
    const nuevoPersonaje = new Personaje({
      nombre,
      genero,
      ambito,
      adjetivo,
      año,
      dato,
      pista,
      pais
    });

    await nuevoPersonaje.save();

    res.status(201).send({ ok: true, mensaje: "Personaje creada con éxito" });
  } catch (error) {
    console.error("Error al crear el personaje:", error);
    res.status(500).send({ ok: false, error: "Error al crear el personaje", detalle: error.message });
  }
});

//put
app.put('/Personajes', async (req, res) => {
  try {
      const { personajeDelDia, personajeDelDiaNuevo, personajeDelDiaLogro, personajeDelDiaNuevoLogro } = req.body;

      if (personajeDelDia && personajeDelDiaNuevo) {
          await Personaje.findByIdAndUpdate(personajeDelDia._id, { deldia: false });

          await Personaje.findByIdAndUpdate(personajeDelDiaNuevo._id, { deldia: true });

          res.status(200).json({ ok: true, mensaje: 'Personajes del dia clasico actualizados con éxito' });
      }else if(personajeDelDiaLogro && personajeDelDiaNuevoLogro){
        await Personaje.findByIdAndUpdate(personajeDelDia._id, { deldialogro: false });

        await Personaje.findByIdAndUpdate(personajeDelDiaNuevo._id, { deldialogro: true });

        res.status(200).json({ ok: true, mensaje: 'Personajes del dia logro actualizados con éxito' });
      }else {
          res.status(400).json({ ok: false, mensaje: 'Personajes no definidos correctamente' });
      }
  } catch (error) {
      console.error('Error al actualizar personajes:', error);
      res.status(500).json({ ok: false, error: 'Error al actualizar personajes' });
  }
});

//Lenguajes
const lenguajeSchema = new mongoose.Schema({
  lenguaje: String ,
  codigo: String,
  dato: String,
  pista: String,
  deldia: {
    type: Boolean,
    default: false
  },
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

app.post("/Lenguajes", async (req, res) => {
  const {
    lenguaje,
    codigo,
    datocodigo,
    pistacodigo 
  } = req.body;

  try {
    const nuevoLenguaje = new Lenguaje({
      lenguaje,
      codigo,
      dato: datocodigo,
      pista: pistacodigo 
    });

    await nuevoLenguaje.save();

    res.status(201).send({ ok: true, mensaje: "Icono creada con éxito" });
  } catch (error) {
    console.error("Error al crear el icono:", error);
    res.status(500).send({ ok: false, error: "Error al crear el icono", detalle: error.message });
  }
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
  },
  framework: {
    type: [{}],
    default: null
  },
  haswonframework: {
    type: Boolean,
    default: false
  },
  rol: {
    type: String,
    default: 'user'
  }
});

const Usuario = mongoose.model("Usuario", usuarioSchema, "Usuarios");

cron.schedule('0 0 * * *', async () => {
  console.log('ME EJECUTO PUTO');
  try {
    await Usuario.deleteMany({});
    console.log('Usuarios eliminados exitosamente.');

    await Personaje.updateMany({}, { $set: { deldia: false, deldialogro: false } });
    console.log('Campos "deldia" y "deldialogro" actualizados para todos los personajes.');

    //Seleccionar un personaje random para clasico y para logro 
    const personajes = await Personaje.aggregate([{ $sample: { size: 2 } }]);

    await Personaje.updateOne({ nombre: personajes[0].nombre }, { $set: { deldia: true } });
    
    await Personaje.updateOne({ nombre: personajes[1].nombre }, { $set: { deldialogro: true } });

    console.log('Personajes: ', personajes);
    
    //Seleccionar un lenguaje random
    await Lenguaje.updateMany({}, { $set: { deldia: false } });

    const lenguajes = await Lenguaje.aggregate([{ $sample: { size: 1 } }]);

    await Lenguaje.updateOne({ nombre: lenguajes[0].nombre }, { $set: { deldia: true } });

    console.log('Lenguaje: ', lenguajes);

    //Seleccionar un icono random
    await Framework.updateMany({}, { $set: { deldia: false } });

    const iconos = await Framework.aggregate([{ $sample: { size: 1 } }]);

    await Framework.updateOne({ nombre: iconos[0].nombre }, { $set: { deldia: true } });

    console.log('Icono: ', iconos);

  } catch (error) {
    console.error('Error al eliminar usuarios:', error);
  }
});

//POST
app.post('/Usuarios', async (req, res) => {
  const { ip } = req.body;

  console.log('USER IP: ', ip);

  if (!ip) {
    return res.status(400).json({ error: 'La dirección IP es requerida.' });
  }

  const encryptedIP = encryptIP(ip, secretKey);
  console.log('ENCRYPTED IP: ', encryptedIP);

  try {
    const nuevoUsuario = new Usuario({
      ip: encryptedIP,
    });

    console.log('NUEVO USUARIO: ', nuevoUsuario);

    await nuevoUsuario.save();

    res.status(201).json({ message: 'Dirección IP almacenada con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Buscar usuario por IP
app.get('/Usuarios/:ip', async (req, res) => {
  const { ip } = req.params;

  console.log('IP a comparar: ', ip);

  if (!ip) {
    return res.status(400).json({ error: 'La dirección IP es requerida.' });
  }

  try {
    const usuarios = await Usuario.find();

    const usuario = usuarios.filter(usuario => {
      const decryptedIP = decryptIP(usuario.ip, secretKey);
      return decryptedIP === ip;
    });

    if (usuario.length > 0) {
      res.status(200).json({ message: 'Dirección IP encontrada en usuarios:', usuario });
    } else {
      res.status(404).json({ message: 'Dirección IP no encontrada en usuarios.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
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
  const { ip } = req.params;

  try {
    const usuarios = await Usuario.find();

    console.log('USUARIOS CON IP', usuarios);

    const usuario = usuarios.find((usuario) => {
      const decryptedIP = decryptIP(usuario.ip, secretKey);
      return decryptedIP === ip;
    });

    console.log('USUARIO A ACTUALIZAR: ', usuario);

    if (!usuario) {
      return res.status(404).send({ ok: false, mensaje: "Usuario no encontrado" });
    }

    const { nombre, clasico, haswonclasico, logro, haswonlogro, lenguaje, haswonlenguaje, framework, haswonframework, rol } = req.body;
    const updatedUsuario = await Usuario.findOneAndUpdate(
      { ip: usuario.ip },
      { nombre, clasico, haswonclasico, logro, haswonlogro, lenguaje, haswonlenguaje, framework, haswonframework, rol },
      { new: true }
    );

    res.status(200).send({ ok: true, usuario: updatedUsuario });
  } catch (error) {
    res.status(500).send({ ok: false, error: "Error al actualizar el usuario" });
  }
});

//SUGERENCIAS

//Personajessugerencia
const sugerenciaSchema = new mongoose.Schema({
  nombre: String ,
  genero: String,
  ambito: String,
  adjetivo: String,
  año: Number,
  dato: String,
  pista: String,
  pais: String
});

const Sugerencia = mongoose.model("Sugerencia", sugerenciaSchema, "Sugerencias");

// GET /sugerencia: función que devuelve los personajes sugeridos de la BD
app.get("/Sugerencias", (req, res) => {
    Sugerencia.find()
    .then((resultado) => {
      res.status(200).send({ ok: true, resultado: resultado });
    })
    .catch((error) => {
      res.status(500).send({ ok: false, error: "Error obteniendo personajes" });
    });
});

app.post("/Sugerencias", async (req, res) => {
  const {
    nombre,
    genero,
    ambito,
    adjetivo,
    año,
    dato,
    pista,
    pais
  } = req.body;

  try {
    const nuevaSugerencia = new Sugerencia({
      nombre,
      genero,
      ambito,
      adjetivo,
      año,
      dato,
      pista,
      pais
    });

    await nuevaSugerencia.save();

    res.status(201).send({ ok: true, mensaje: "Sugerencia creada con éxito" });
  } catch (error) {
    console.error("Error al crear la sugerencia:", error);
    res.status(500).send({ ok: false, error: "Error al crear la sugerencia", detalle: error.message });
  }
});

app.delete("/Sugerencias/:id", async (req, res) => {
  const sugerenciaId = req.params.id;

  try {
      const resultado = await Sugerencia.deleteOne({ _id: sugerenciaId });

      if (resultado.deletedCount === 0) {
          res.status(404).send({ ok: false, error: "Sugerencia no encontrada" });
      } else {
          res.status(200).send({ ok: true, mensaje: "Sugerencia eliminada con éxito" });
      }
  } catch (error) {
      console.error("Error al eliminar la sugerencia:", error);
      res.status(500).send({ ok: false, error: "Error al eliminar la sugerencia", detalle: error.message });
  }
});


//ICONOS

const frameworkSchema = new mongoose.Schema({
  nombre: String ,
  icon: String,
  dato: String,
  deldia: {
    type: Boolean,
    default: false
  },
});

const Framework = mongoose.model("Framework", frameworkSchema, "Frameworks");

// GET /framework: función que devuelve los iconos sugeridos de la BD
app.get("/Frameworks", (req, res) => {
    Framework.find()
    .then((resultado) => {
      res.status(200).send({ ok: true, resultado: resultado });
    })
    .catch((error) => {
      res.status(500).send({ ok: false, error: "Error obteniendo el icono" });
    });
});

app.post("/Frameworks", async (req, res) => {
  const {
    nombretecnologia,
    icono,
    datoicono,
  } = req.body;

  try {
    const nuevoIcono = new Framework({
      nombre: nombretecnologia,
      icon: icono,
      dato: datoicono
    });

    await nuevoIcono.save();

    res.status(201).send({ ok: true, mensaje: "Icono creada con éxito" });
  } catch (error) {
    console.error("Error al crear el icono:", error);
    res.status(500).send({ ok: false, error: "Error al crear el icono", detalle: error.message });
  }
});

function encryptIP(ip, key) {
  const cipher = crypto.createCipher('aes-256-cbc', secretKey);
  let encrypted = cipher.update(ip, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decryptIP(ip, key) {
  try {
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypted = decipher.update(ip, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
  } catch (error) {
    console.error('Error al descifrar la dirección IP:', error);
    return null;
  }
}


app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});