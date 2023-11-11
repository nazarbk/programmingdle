import React from 'react';
import Header from './Header';
import { useState, useEffect } from 'react';
import CountdownClock from './CountdownClock';
import { Link } from 'react-router-dom';

const Logro = () => {
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
  const [username, setUsername] = useState('');
  //username que se usa para almacenar el valor del input
  const [nombreusuario, setNombreusuario] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);

  const mostrarPista = () => {
    setMostrarMensaje(!mostrarMensaje);
  };

  useEffect(() => {
    fetch('https://programmingdle.onrender.com/Personajes')
      .then(response => {
        if (!response.ok) {
          throw new Error('La solicitud no pudo ser completada.');
        }
        return response.json();
      })
      .then(data => {
        setPersonajes(data.resultado);

        //const indiceAleatorio = Math.floor(Math.random() * data.resultado.length);
        const personajeAleatorioInicial = data.resultado[4];
        setpersonajeDelDia(personajeAleatorioInicial);
      })
      .catch(error => {
        console.error(error);
      });

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
            if(data.usuario.logro !== null && data.usuario.logro.length !== 0){
              setPersonajeBuscado(data.usuario.logro);
              setIntentos(data.usuario.logro.length);
              setactualizarPersonajes(true);
            }
            if(data.usuario.nombre != null && data.usuario.nombre.length !== 0){
              setUsername(data.usuario.nombre)
            }
              setHasWon(data.usuario.haswonlogro);
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
      cargarRanking();

      setTimeout(() => {
        setLoading(false);
        setShowContent(true);
      }, 1000);
  }, []);

  const compararPersonajes = async () => {

    console.log('Personaje del día: ', personajeDelDia);
    const personaje = personajes.find((personaje) =>personaje.nombre.toLowerCase() === busqueda.toLowerCase());

    if (personaje) {
      actualizarIntento();
      console.log(intentos);

      const coincidencias = {
        nombre: personajeDelDia.nombre === personaje.nombre
      };
      
      setPersonajeBuscado([...personajeBuscado, { personaje, coincidencias }]);
      setCoincidencias(coincidencias);
      eliminarPersonaje(busqueda);
      setaactualizarUser(true);

      console.log('COINCIDENCIA: ', coincidencias);

      if(coincidencias.nombre === true){
        setHasWon(true);
        cargarRanking();
      }
    } else {
      
    }
  };

  const actualizarUsuario = async () => {
    const datosActualizacion = {
      logro: personajeBuscado,
      haswonlogro: hasWon
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
          cargarRanking();
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

  const handleBusquedaChange = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);

    const resultados = personajes.filter(personaje => personaje.nombre.toLowerCase().startsWith(valor.toLowerCase()));
    if(resultados.length === 0){
      setPersonajeNoEncontrado(true);
    }else{
      setPersonajeNoEncontrado(false);
    } 

    setResultadosBusqueda(resultados);
  };

  const autocompletarInput = (nombre) => {
    setBusqueda(nombre);
    setResultadosBusqueda([]);
  };

  const copiarButton = () => {
  
    let textoCopiado = `He encontrado el personaje de #Programmingdle en modo Logro en ${intentos} intentos`;
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
    let textoCompartido = `He encontrado el personaje de #Programmingdle en modo Logro en ${intentos} intentos`;
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

  const handleUsernameChange = (e) => {
    const valor = e.target.value;
    setNombreusuario(valor);
  }

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
          cargarRanking();
        } else {
          console.log('Usuario no encontrado:', data.mensaje);
        }
      })
      .catch(error => {
        console.error('Error al actualizar el usuario:', error);
      });
  };

  if(actualizarUser){
    actualizarUsuario();
  }
  if(actualizarPersonajes){
    eliminarPersonajes();
  }
  const cargarRanking = () => {
    fetch('https://programmingdle.onrender.com/Usuarios', {
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
        if (data.usuarios && data.usuarios.length > 0) {
          const usuariosOrdenados = data.usuarios
          .filter(usuario => 
            usuario.logro && 
            usuario.logro.length > 0 && 
            usuario.haswonlogro === true
          )
          .sort((a, b) => a.logro.length - b.logro.length);
          setUsersRanking(usuariosOrdenados);
        } else {
          setUsersRanking([]);
        }
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
      });
  }

  const handlePopupToggle = () => {
    setPopupVisible(!popupVisible);
  };

  return (
      <div className='logro'>
      <Header/>
      {loading && (
        <div className='loading'>
          <i class='bx bx-loader-circle bx-spin'></i>
        </div>
      )}

      {showContent && (
      <div>

      <div className="containerStyle">
        <p className="mail">
          <a href="mailto:quizmizdevs@gmail.com" className="tooltip" data-tooltip="Enviar correo electrónico">
            <i className='bx bx-envelope'></i>
            <span class="tooltip-text">Enviar correo electrónico</span>
          </a>
        </p>
        <p className="rank">
          <a href="#ranking-section" className="tooltip" data-tooltip="Ranking diario">
            <i className='bx bx-bar-chart-alt-2'></i>
            <span class="tooltip-text">Ranking diario</span>
          </a>
        </p>
        <p className="help">
          <a href='#help' className="tooltip" data-tooltip="Ranking diario" onClick={handlePopupToggle}>
            <i className='bx bx-help-circle'></i>
            <span class="tooltip-text">¿Cómo se juega?</span>
          </a>
        </p>
      </div>

      {popupVisible && (
        <div className="overlay">
          <div className="popup2">
            <button className="close-button" onClick={handlePopupToggle}>
              <i className="bx bx-x"></i>
            </button>
            <h2>¿Cómo se juega?</h2>
            <p>Adivina el campeón de hoy del juego de Programmingdle. Cambia cada 24 horas.</p>
            <h2>Modo Logro</h2>
            <p>En el modo logro, intenta adivinar qúe personaje famoso tuvo ese logro/descubrimiento durante su vida.
              El color de las celdas cambiará para mostrar lo cerca que estaba tu respuesta del personaje del día a encontrar.
            </p>
            <p><span className='verde'>Verde</span> Indica que es el personaje a encontrar.<br></br>
                <span className='rojo'>Rojo</span> Indica que no hay coincidencia entre el personaje que ingresaste y el personaje a adivinar.
            </p>
            <h2>Pista</h2>
            <p>Para ayudarte a encontrar al personaje, podrás desbloquear una pista sobre el personaje tras varios intentos.</p>
            <p>Si has adivinado el personaje, puedes regresar a la sección de pistas y ver la pista sobre el personaje a adivinar</p>
          </div>
        </div>
      )}

      <div className='clasicocard'>
          <h2  className='clasicotitulo'>Un personaje que...</h2>
            <div className='hoja'>
              <p className='logrotexto'>{personajeDelDia.dato}</p>
            </div>
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
                null
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

              <p className="contador">Próximo personaje en</p>
              <CountdownClock/> 

              <p className='nextmode'>Siguiente modo:</p>
              <div className='modo2'>
                <div className='icono2'>
                    <i className='bx bx-code-block'></i>
                </div>
                <Link to="/lenguaje">
                <div className='nombre2'>
                    <h1>Lenguaje</h1>
                    <p>Adivina el lenguaje de programación</p>
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
              <button className='send'onClick={compararPersonajes}>
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
                </tr>
              </thead>
              <tbody>
                {personajeBuscado.map((buscado, index) => (
                  <tr className='intentostabla'>
                    <td className={buscado.coincidencias.nombre ? 'green_cell' : 'red_cell'}>{buscado.personaje.nombre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {hasWon ? (
            <div className='downcard'>
              <div className='sharecard'>
                <p>He encontrado el personaje de #Programmingdle en modo Logro en {intentos} intentos</p>

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

      <div className='ranking-container' id='ranking-section'>
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
              {usersranking.map(user => (
                <tr key={user._id}>
                  <td>{user.nombre || ''}</td>
                  <td>{user.logro.length || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
      )}
    </div>
  );
}

export default Logro;
