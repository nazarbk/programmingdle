import React from 'react';
import Header from './Header';
import { useState, useEffect, useRef } from 'react';
import CountdownClock from './CountdownClock';
import { Link } from 'react-router-dom';
import Footer from './Footer';

import { BiCodeBlock, BiLogoTypescript, BiLogoMongodb, BiLogoJava, BiLogoGoLang, BiLogoVisualStudio, BiLogoUnity, BiLogoPhp, BiLogoGithub, BiLogoAngular, BiLogoCodepen, BiLogoHtml5, BiLogoJavascript, BiLogoVuejs, BiLogoReact, BiLogoBootstrap, BiLogoBlender, BiLogoSpringBoot, BiLogoTux, BiLogoMarkdown, BiLogoPython, BiLogoFirebase, BiLogoCPlusPlus, BiLogoLess} from 'react-icons/bi';
const Icono = () => {
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
  const containerRef = useRef(null);

  const iconComponents = {
    BiCodeBlock, BiLogoTypescript, BiLogoMongodb, BiLogoJava, BiLogoGoLang, BiLogoVisualStudio, BiLogoUnity, BiLogoPhp, BiLogoGithub, BiLogoAngular, BiLogoCodepen, BiLogoHtml5, BiLogoJavascript, BiLogoVuejs, BiLogoReact, BiLogoBootstrap, BiLogoBlender, BiLogoSpringBoot, BiLogoTux, BiLogoMarkdown, BiLogoPython, BiLogoFirebase, BiLogoCPlusPlus, BiLogoLess
  };

  useEffect(() => {
    fetch('https://programmingdle.onrender.com/Frameworks')
      .then(response => {
        if (!response.ok) {
          throw new Error('La solicitud no pudo ser completada.');
        }
        return response.json();
      })
      .then(data => {
        setPersonajes(data.resultado);
        const personajeAleatorioInicial = data.resultado.find(personaje => personaje.deldia === true);
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
          if (data.usuario) {
            console.log('Usuario encontrado:', data.usuario);
            if(data.usuario[0].framework !== null && data.usuario[0].framework.length !== 0){
              setPersonajeBuscado(data.usuario[0].framework);
              setIntentos(data.usuario[0].framework.length);
              setactualizarPersonajes(true);
            }
            if(data.usuario[0].nombre != null && data.usuario[0].nombre.length !== 0){
              setUsername(data.usuario[0].nombre)
            }
              setHasWon(data.usuario[0].haswonframework);
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

      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      if(coincidencias.nombre === true){
        setHasWon(true);
        cargarRanking();
      }
    } else {
    }
  };

  const actualizarUsuario = async () => {
    const datosActualizacion = {
      framework: personajeBuscado,
      haswonframework: hasWon
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
  
    let textoCopiado = `He encontrado el Icono de #Programmingdle en ${intentos} intentos`; 

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
    let textoCompartido = `He encontrado el Icono de #Programmingdle en ${intentos} intentos`;

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
      console.log('NOMBRE USUARIO: ', nombreusuario)
        if(nombreusuario === null || nombreusuario.length === 0){
          alert('El nombre de usuario no puede ser vacío');
        }else{
          const nombreUsuarioExistente = data.usuarios.some(usuario => usuario.nombre === nombreusuario);

          if(!nombreUsuarioExistente){
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
          }else{
            alert('El nombre de usuario ya existe');
          }
        }
    })
    .catch(error => {
      console.error('Error al obtener usuarios:', error);
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
            usuario.framework && 
            usuario.framework.length > 0 && 
            usuario.haswonframework === true
          )
          .sort((a, b) => a.framework.length - b.framework.length);
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

  const iconoEstilos = {
    filter: `blur(${9 - intentos}px)`
  };

  const iconoSinEstilo = {
    filter: `blur(${0}px)`
  };


  return (
      <div className='logro'>
      <Header/>
      {loading && (
        <div className='loading'>
          <i className='bx bx-loader-circle bx-spin'></i>
        </div>
      )}

      {showContent && (
      <div>

      <div className="containerStyle">
        <p className="mail">
          <a href="mailto:quizmizdevs@gmail.com" className="tooltip" data-tooltip="Enviar correo electrónico">
            <i className='bx bx-envelope'></i>
            <span className="tooltip-text">Enviar correo electrónico</span>
          </a>
        </p>
        <p className="rank">
          <a href="#ranking-section" className="tooltip" data-tooltip="Ranking diario">
            <i className='bx bx-bar-chart-alt-2'></i>
            <span className="tooltip-text">Ranking diario</span>
          </a>
        </p>
        <p className="help">
          <a href='#help' className="tooltip" data-tooltip="Ranking diario" onClick={handlePopupToggle}>
            <i className='bx bx-help-circle'></i>
            <span className="tooltip-text">¿Cómo se juega?</span>
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
            <p>Adivina el icono de hoy del juego de Programmingdle. Cambia cada 24 horas.</p>
            <h2>Modo Icono</h2>
            <p>En el modo Icono, intenta adivinar a que tecnología/herramienta pertenece el Icono.
              El color de las celdas cambiará para mostrar lo cerca que estaba tu respuesta del Icono del día a encontrar.
            </p>
            <p><span className='verde'>Verde</span> Indica que es el icono a encontrar.<br></br>
                <span className='rojo'>Rojo</span> Indica que no hay coincidencia entre el icono que ingresaste y el icono a adivinar.
            </p>
            <h2>Pista</h2>
            <p>Para ayudarte a encontrar al icono, este se irá renderizando poco a poco con cada intento que hagas, de modo que a los 9 intentos el icono tendrá su estado original.</p>
          </div>
        </div>
      )}

        <div className='containerclasico'>
          <div className='clasicocard'>
            <h2  className='clasicotitulo'>A que tecnología pertenece el icono...</h2>
            <div  className='iconoframework' >
            {hasWon ?(
              <div style={iconoSinEstilo}>
                {iconComponents[personajeDelDia.icon] && React.createElement(iconComponents[personajeDelDia.icon])}
              </div>
            ) : (
              <div style={iconoEstilos}>
                {iconComponents[personajeDelDia.icon] && React.createElement(iconComponents[personajeDelDia.icon])}
              </div>
            )}
            </div>
            <p className='textoframe'>Cada intento renderizará un poco más la imagen</p>
          </div>
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
              <p className="contador">Próximo icono en</p>
              <CountdownClock/> 
            </div>
          </div>
        ) : (
          <div className='downcard'>
            <div className='clasicoinput'>
              <input className='personajebuscador' placeholder='Escribe el nombre de una tecnología' value={busqueda} onChange={handleBusquedaChange}></input>
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
              <p>No se ha encontrado ninguna tecnología</p>
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
          <div className="tabla" ref={containerRef}>
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
                <p>He encontrado el icono de #Programmingdle en {intentos} intentos</p>

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
                  <td>{user.framework.length || ''}</td>
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

export default Icono;
