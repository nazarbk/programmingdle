import React, { useEffect, useState } from 'react';
import CountdownClock from './CountdownClock';
import Header from './Header';
import { Link } from 'react-router-dom';

const Clasico = () => {
  const [personajes, setPersonajes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const [personajeDelDia, setpersonajeDelDia] = useState();

  const [personajeBuscado, setPersonajeBuscado] = useState([]);
  const [coincidencias, setCoincidencias] = useState([]);
  const [intentos, setIntentos] = useState(0);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [personajeNoEncontrado, setPersonajeNoEncontrado] = useState(false);
  const [ipToUpdate, setipToUpdate] = useState(null);
  const [actualizarPersonajes, setactualizarPersonajes] = useState(false);
  const [actualizarUser, setaactualizarUser] = useState(false);
  const [usersranking, setUsersRanking] = useState([]);
  const [cargarRanking, setcargarRanking] = useState(false);
  const [username, setUsername] = useState('');
  //username que se usa para almacenar el valor del input
  const [nombreusuario, setNombreusuario] = useState('');

  useEffect(() => {
      //Personajes
      fetch('https://programmingdle.onrender.com/Personajes')
      .then(response => {
        if (!response.ok) {
          throw new Error('La solicitud no pudo ser completada.');
        }
        return response.json();
      })
      .then(data => {
        setPersonajes(data.resultado);

        const indiceAleatorio = Math.floor(Math.random() * data.resultado.length);
        const personajeAleatorioInicial = data.resultado[8];
        setpersonajeDelDia(personajeAleatorioInicial);
      })
      .catch(error => {
        console.error(error);
      });

      //IP
      fetch('https://programmingdle.onrender.com/')
      .then(response => response.text())
      .then(data => {
        setipToUpdate(data.toString());

        const ipToSearch = data.toString();

        fetch(`https://programmingdle.onrender.com/Usuarios/${ipToSearch}`)
        .then(response => {
          if (!response.ok) {
          } else {
            return response.json();
          }
        })
        .then(data => {
          if (data.ok) {
            console.log('Usuario encontrado:', data.usuario);
            if(data.usuario.clasico !== null && data.usuario.clasico.length !== 0){
              setPersonajeBuscado(data.usuario.clasico);
              setIntentos(data.usuario.clasico.length);
              setactualizarPersonajes(true);
            }
            if(data.usuario.nombre != null && data.usuario.nombre.length != ''){
              setUsername(data.usuario.nombre)
            }
              setHasWon(data.usuario.haswonclasico);
          }
        })
        .catch(error => {
          console.error('Error al buscar el usuario:', error);
        });
      })
      .catch(error => {
        console.error('Error al obtener la dirección IP:', error);
      });

      //Ranking
      setcargarRanking(true);
  }, []);

  const handleBusquedaChange = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);

    const resultados = personajes.filter(personaje => personaje.nombre.toLowerCase().startsWith(valor.toLowerCase()));
    if(resultados.length === 0){
      setPersonajeNoEncontrado(true);
    }else{
      setPersonajeNoEncontrado(false);
    } 

    //console.log("RESULTADOS: ", resultados);
    setResultadosBusqueda(resultados);
  };

  const handleUsernameChange = (e) => {
    const valor = e.target.value;
    setNombreusuario(valor);
  }

  const autocompletarInput = (nombre) => {
    setBusqueda(nombre);
    setResultadosBusqueda([]);
  };

  const compararPersonajes = async () => {

    //console.log('Personaje del día: ', personajeDelDia);
    const personaje = personajes.find((personaje) =>personaje.nombre.toLowerCase() === busqueda.toLowerCase());

    if (personaje) {
      actualizarIntento();
      //console.log(intentos);

      const todasLasCaracteristicasCoinciden =
        personajeDelDia.nombre === personaje.nombre && 
        personajeDelDia.genero === personaje.genero && 
        personajeDelDia.ambito === personaje.ambito && 
        personajeDelDia.adjetivo === personaje.adjetivo && 
        personajeDelDia.año === personaje.año && 
        personajeDelDia.pais === personaje.pais;

      const coincidencias = {
        nombre: personajeDelDia.nombre === personaje.nombre,
        genero: personajeDelDia.genero === personaje.genero,
        ambito: personajeDelDia.ambito === personaje.ambito,
        adjetivo: personajeDelDia.adjetivo === personaje.adjetivo,
        año: personajeDelDia.año === personaje.año,
        pais: personajeDelDia.pais === personaje.pais,
      };
      
      setPersonajeBuscado([...personajeBuscado, { personaje, coincidencias }]);
      setCoincidencias((prevCoincidencias) => [...prevCoincidencias, coincidencias]);
      eliminarPersonaje(busqueda);
      setaactualizarUser(true);

      if(todasLasCaracteristicasCoinciden){
        setHasWon(true);
        setcargarRanking(true);
      }
    }
  };

  const actualizarNombreUsuario = () => {
    setUsername(nombreusuario);

    const datosActualizacion = {
      nombre: nombreusuario
    };

    fetch(`https://programmingdle.onrender.com/Usuarios/${ipToUpdate}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosActualizacion),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('La solicitud no pudo ser completada.');
        }
        return response.json();
      })
      .then(data => {
        if (data.ok) {
          console.log('Usuario actualizado:', data.usuario);
        } else {
          console.log('Usuario no encontrado:', data.mensaje);
        }
      })
      .catch(error => {
        console.error('Error al actualizar el usuario:', error);
      });

      setcargarRanking(true);
  };

  const actualizarUsuario = async () => {
    const datosActualizacion = {
      intentosclasico: intentos,
      clasico: personajeBuscado,
      haswonclasico: hasWon
    };

    fetch(`https://programmingdle.onrender.com/Usuarios/${ipToUpdate}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosActualizacion),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('La solicitud no pudo ser completada.');
        }
        return response.json();
      })
      .then(data => {
        if (data.ok) {
          console.log('Usuario actualizado:', data.usuario);
        } else {
          console.log('Usuario no encontrado:', data.mensaje);
        }
      })
      .catch(error => {
        console.error('Error al actualizar el usuario:', error);
      });

      setaactualizarUser(false);
  }

  const actualizarIntento = async () => {
    setIntentos(intentos + 1);
  }

  const mostrarPista = () => {
    setMostrarMensaje(!mostrarMensaje);
  };

  const eliminarPersonaje = (nombre) => {
    const nuevosPersonajes = [...personajes];
    const nuevosPersonajesFiltrados = nuevosPersonajes.filter((personaje) => personaje.nombre !== nombre);
    setPersonajes(nuevosPersonajesFiltrados);
  };

  const eliminarPersonajes = () =>{
    const nombresPersonajesBuscados = personajeBuscado.map((item) => item.personaje.nombre);
    const nuevosPersonajes = personajes.filter((personaje) => !nombresPersonajesBuscados.includes(personaje.nombre));
    setPersonajes(nuevosPersonajes);
    setactualizarPersonajes(false);
  }

  const copiarButton = () => {
    const emojis = personajeBuscado.slice(-5).map((buscado) => {
      return Object.entries(buscado.coincidencias).map(([atributo, coincide]) => {
        if (atributo !== 'nombre') {
          const isAmbito = atributo === 'ambito';
          const isAmbitoMatch = isAmbito && !coincide && (personajeDelDia.ambito.toLowerCase().includes(buscado.personaje.ambito.toLowerCase()) || buscado.personaje.ambito.toLowerCase().includes(personajeDelDia.ambito.toLowerCase()));
    
          const emoji = isAmbitoMatch ? '🟡' : (coincide ? '✅' : '❌');
    
          return emoji;
        }
        return null;
      }).join(' ');
    }).join('\n');
  
    let textoCopiado = `He encontrado el personaje de #Programmingdle en modo Clásico en ${intentos} intentos:\n${emojis}`;
    if (personajeBuscado.length > 5) {
      textoCopiado += `\n+ ${personajeBuscado.length - 5} filas adicionales`;
    }

    textoCopiado += `\n[https://programmingdle.web.app/]`;
  
    const textarea = document.createElement('textarea');
    textarea.value = textoCopiado;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    //Mostrar un mensaje que indique que se ha copiado 
    const copiadoMensaje = document.getElementById('copiadoMensaje');
    copiadoMensaje.style.display = 'block';

    //Ocultar el mensaje después de 2 segundos
    setTimeout(() => {
      copiadoMensaje.style.display = 'none';
    }, 2000);
  };

  const compartirButton = () => {
    const emojis = personajeBuscado.slice(-5).map((buscado) => {
      return Object.entries(buscado.coincidencias).map(([atributo, coincide]) => {
        if (atributo !== 'nombre') {
          const isAmbito = atributo === 'ambito';
          const isAmbitoMatch = isAmbito && !coincide && (personajeDelDia.ambito.toLowerCase().includes(buscado.personaje.ambito.toLowerCase()) || buscado.personaje.ambito.toLowerCase().includes(personajeDelDia.ambito.toLowerCase()));
    
          const emoji = isAmbitoMatch ? '🟡' : (coincide ? '✅' : '❌');
    
          return emoji;
        }
        return null;
      }).join(' ');
    }).join('\n');

    let textoCompartido = `He encontrado el personaje de #Programmingdle en modo Clásico en ${intentos} intentos:\n${emojis}`;
    if (personajeBuscado.length > 5) {
      textoCompartido += `\n+ ${personajeBuscado.length - 5} filas adicionales`;
    }

    textoCompartido += `\n[https://programmingdle.web.app/]`;
  
    //Enlace a Whatsapp 
    const mensajeWhatsApp = encodeURIComponent(textoCompartido);
    const enlaceWhatsApp = `https://api.whatsapp.com/send?text=${mensajeWhatsApp}`;
  
    //Redirección a Whatsapp para enviar el mensaje
    window.open(enlaceWhatsApp);
  };

  if(actualizarUser){
    actualizarUsuario();
  }
  if(actualizarPersonajes){
    eliminarPersonajes();
  }
  if(cargarRanking){
    fetch('https://programmingdle.onrender.com/Usuarios/rankclasico', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('La solicitud no pudo ser completada.');
        }
        return response.json();
      })
      .then(data => {
        setUsersRanking(data.usuarios);
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
      });
      setcargarRanking(false);
  }

  //console.log('HASWON: ', hasWon);
  //console.log('INTENTOS: ', intentos);
  //console.log('PERSONAJES BUSCADOS:', personajeBuscado);
  //console.log('PERSONAJES COMPARADOS:',coincidencias);
  console.log('NOMBRE DE USUARIO: ', nombreusuario);

  return (
    <div className='clasico'>
        <Header/>
        <div className='clasicocard'>
          <h2  className='clasicotitulo'>¡Adivina el personaje del día!</h2>
          {(intentos >= 6 || hasWon) ? (
            <div className='pistadiv2'>
              <i className='bx bx-bulb bx-tada' onClick={mostrarPista}></i>
              <p className='pistatexto2'>Pista del logro</p>
              {mostrarMensaje && (
                <div className='bocadillopista'>
                  <p className='pistatexto3'>{personajeDelDia.pista}</p>
                </div>
              )}
            </div>
          ) : (
            intentos === 0 ? (
              <p className='clasicotexto'>Escribe cualquier personaje para empezar</p>
            ) : (
              <div className='pistadiv'>
                <i className='bx bx-bulb'></i>
                <p className='pistatexto'>Pista en {6 - intentos} intentos</p>
              </div>
            )
          )}
        </div>

        {hasWon ?(
          <div className='downcard'>
            <div className='wincard'>
              <h2  className='wintext'>¡Has acertado!</h2>
              <p className="wintext2">#{personajeDelDia.nombre}</p>
              <div className='datodiv'>
                <p className='titulodato'>¿Sabías que...?</p>
                <p className='textodato'>{personajeDelDia.dato}</p>
              </div>

              <p className="contador">Próximo personaje en</p>
              <CountdownClock/>

              <p className='nextmode'>Siguiente modo:</p>
              <div className='modo2'>
                <div className='icono2'>
                    <i className='bx bx-trophy'></i>
                </div>
                <Link to="/logro">
                  <div className='nombre2'>
                      <h1>Logro</h1>
                      <p>Adivina el personaje según su logro</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className='downcard'>
            <div className='clasicoinput'>
              <input className='personajebuscador' placeholder='Escribe el nombre de un personaje' value={busqueda} onChange={handleBusquedaChange}></input>
            </div>
            <div className='clasicoicono'>
              <button className='send' onClick={compararPersonajes}>
                <i className='bx bx-send'></i>
              </button>
            </div>
          </div>
        )}

        <div className='listaresultados'>  
          {personajeNoEncontrado && (
            <div className='noresultado'>
              <p>No se ha encontrado ningun personaje</p>
            </div>
          )}
        </div>

        <div className='listaresultados'>
          {busqueda && resultadosBusqueda.length > 0 && (
            <ul>
              {resultadosBusqueda.map(personaje => (
                 <li onClick={() => autocompletarInput(personaje.nombre)}>{personaje.nombre}</li>
              ))}
            </ul>
          )}  
        </div>

        {personajeBuscado.length > 0 && (
        <div className="tabla">
          <table className='tablaresultados'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Genero</th>
                <th>Ámbito</th>
                <th>Adjetivo</th>
                <th>Año</th>
                <th>País</th>
              </tr>
            </thead>
            <tbody>
              {personajeBuscado.map((buscado, index) => (
                <tr className='intentostabla'>
                  <td className={buscado.coincidencias.nombre ? 'blue_cell' : 'blue_cell'}>{buscado.personaje.nombre}</td>
                  <td className={buscado.coincidencias.genero ? 'green_cell' : 'red_cell'}>{buscado.personaje.genero}</td>
                  <td className={buscado.coincidencias.ambito ? 'green_cell' : (buscado.coincidencias.ambito === false && (personajeDelDia.ambito.toLowerCase().includes(buscado.personaje.ambito.toLowerCase()) || buscado.personaje.ambito.toLowerCase().includes(personajeDelDia.ambito.toLowerCase()))) ? 'yellow_cell' : 'red_cell'}>{buscado.personaje.ambito}</td>
                  <td className={buscado.coincidencias.adjetivo ? 'green_cell' : 'red_cell'}>{buscado.personaje.adjetivo}</td>
                  <td className={buscado.coincidencias.año ? 'green_cell' : 'red_cell'}>
                    {buscado.coincidencias.año ? (
                      <div className="year-cell">{buscado.personaje.año}</div>
                    ) : (
                      <div className="year-cell">
                        {buscado.personaje.año}
                        {buscado.personaje.año < personajeDelDia.año ? (
                          <span className="arrow-up"> &#8593;</span>
                        ) : (
                          <span className="arrow-down"> &#8595;</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className={buscado.coincidencias.pais ? 'green_cell' : 'red_cell'}>{buscado.personaje.pais}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {hasWon ? (
        <div className='downcard'>
          <div className='sharecard'>
            <p>He encontrado el personaje de #Programmingdle en modo Clásico en {intentos} intentos</p>

            <div className="coincidenciasdiv">
            {personajeBuscado.slice(-5).map((buscado, index) => (
              <div key={index}>
                {Object.entries(buscado.coincidencias).map(([atributo, coincide], subindex) => (
                  atributo !== 'nombre' ? (
                    <div key={atributo} className={`cuadrado ${atributo === 'ambito' ? (coincide ? 'green_cell' : (coincide === false && (personajeDelDia.ambito.toLowerCase().includes(buscado.personaje.ambito.toLowerCase()) || buscado.personaje.ambito.toLowerCase().includes(personajeDelDia.ambito.toLowerCase()))) ? 'yellow_cell' : 'red_cell') : (coincide ? 'green_cell' : 'red_cell')}`}></div>
                  ) : null
                ))}
              </div>
            ))}

              {personajeBuscado.length > 5 && (
                <p className='filasadicionales'>+ {personajeBuscado.length - 5} filas adicionales</p>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button className="shareButtonStyle" onClick={copiarButton}> <i className='bx bx-copy-alt'></i> Copiar</button>
              <button className="shareButtonStyle" onClick={compartirButton}><i className='bx bxl-whatsapp'></i> Compartir</button>
            </div>
            
            <p id="copiadoMensaje" className="copiado-mensaje" style={{ display: 'none' }}>¡Texto copiado al portapapeles!  </p>
          </div>
        </div>
      ) : null
      }

      <h2 className="titrank">
        <i className='bx bxs-crown'></i> Ranking Diario
      </h2>

      <div className='ranking-container'>
        {!username && (
          <div className="popup">
            <h2>Ingresa tu nombre de usuario para acceder al ranking</h2>
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={nombreusuario}
              onChange={handleUsernameChange}
            />
            <button onClick={actualizarNombreUsuario}>Guardar</button>
          </div>
        )}
        <div className='ranking'>
          <table className='paper-table'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Intentos</th>
              </tr>
            </thead>
            <tbody>
              {/* Muestra el ranking solo si se ha ingresado un nombre de usuario */}
              {usersranking.map(user => (
                <tr key={user._id}>
                  <td>{user.nombre || ''}</td>
                  <td>{user.clasico.length || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Clasico;
