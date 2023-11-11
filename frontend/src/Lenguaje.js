import React, { useEffect, useState } from 'react';
import CountdownClock from './CountdownClock';
import Header from './Header';
import { Link } from 'react-router-dom';

const Lenguaje = () => {
    const [lenguajes, setLenguajes] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
    const [lenguajeDelDia, setLenguajeDelDia] = useState();

    const [lenguajeBuscado, setLenguajeBuscado] = useState([]);
    const [coincidencias, setCoincidencias] = useState([]);
    const [intentos, setIntentos] = useState(0);
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [lenguajeNoEncontrado, setLenguajeNoEncontrado] = useState(false);
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

    useEffect(() => {
        fetch('https://programmingdle.onrender.com/Lenguajes')
            .then(response => {
                if (!response.ok) {
                    throw new Error('La solicitud no pudo ser completada.');
                }
            return response.json();
        })
        .then(data => {
            setLenguajes(data.resultado);

            //const indiceAleatorio = Math.floor(Math.random() * data.resultado.length);
            const lenguajeAleatorioInicial = data.resultado[5];
            setLenguajeDelDia(lenguajeAleatorioInicial);
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
            if(data.usuario.lenguaje !== null && data.usuario.lenguaje.length !== 0){
              setLenguajeBuscado(data.usuario.lenguaje);
              setIntentos(data.usuario.lenguaje.length);
              setactualizarPersonajes(true);
            }
            if(data.usuario.nombre != null && data.usuario.nombre.length != ''){
                setUsername(data.usuario.nombre)
            }
              setHasWon(data.usuario.haswonlenguaje);
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

    const mostrarPista = () => {
        setMostrarMensaje(!mostrarMensaje);
    };

    const compararLenguajes = async () => {

        console.log('Lenguaje del día: ', lenguajeDelDia);
        const lenguaje = lenguajes.find((lenguaje) =>lenguaje.lenguaje.toLowerCase() === busqueda.toLowerCase());

        if (lenguaje) {
            actualizarIntento();
            console.log(intentos);

            const coincidencias = {
            lenguaje: lenguajeDelDia.lenguaje === lenguaje.lenguaje
            };
            
            setLenguajeBuscado([...lenguajeBuscado, { lenguaje, coincidencias }]);
            setCoincidencias(coincidencias);
            eliminarLenguaje(busqueda);
            setaactualizarUser(true);

            console.log('COINCIDENCIA: ', coincidencias);

            if(coincidencias.lenguaje === true){
              setHasWon(true);
              cargarRanking();
            }
        } else {
            
        }
    };

    const actualizarUsuario = async () => {
        const datosActualizacion = {
          lenguaje: lenguajeBuscado,
          haswonlenguaje: hasWon
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

    const eliminarLenguaje = (nombre) => {
        
        const nuevosLenguajes = [...lenguajes];
        console.log("LENGUAJE A ELIMINAR: ", nuevosLenguajes);
        const nuevosLenguajesFiltrados = nuevosLenguajes.filter((lenguaje) => lenguaje.lenguaje !== nombre);
        
        setLenguajes(nuevosLenguajesFiltrados);
    };

    const eliminarLenguajes = () =>{
        const nuevosLenguajesBuscados = lenguajeBuscado.map((item) => item.lenguaje.lenguaje);
        const nuevosLenguajes = lenguajes.filter((lenguaje) => !nuevosLenguajesBuscados.includes(lenguaje.lenguaje));
        setLenguajes(nuevosLenguajes);
        setactualizarPersonajes(false);
    }

    const handleBusquedaChange = (e) => {
        const valor = e.target.value;
        setBusqueda(valor);
    
        const resultados = lenguajes.filter(lenguaje => lenguaje.lenguaje.toLowerCase().startsWith(valor.toLowerCase()));
        console.log(resultados);
        if(resultados.length === 0){
          setLenguajeNoEncontrado(true);
        }else{
          setLenguajeNoEncontrado(false);
        } 
    
        setResultadosBusqueda(resultados);
      };
    
      const autocompletarInput = (lenguaje) => {
        setBusqueda(lenguaje);
        setResultadosBusqueda([]);
      };

    const copiarButton = () => {
        let textoCopiado = `He encontrado el lenguaje de #Programmingdle en ${intentos} intentos`;
        if (lenguajeBuscado.length > 5) {
            textoCopiado += `\n+ ${lenguajeBuscado.length - 5} filas adicionales`;
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
        let textoCompartido = `He encontrado el lenguaje de #Programmingdle en ${intentos} intentos`;
        if (lenguajeBuscado.length > 5) {
            textoCompartido += `\n+ ${lenguajeBuscado.length - 5} filas adicionales`;
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
        eliminarLenguajes();
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
              usuario.lenguaje && 
              usuario.lenguaje.length > 0 && 
              usuario.haswonlenguaje === true
            )
            .sort((a, b) => a.lenguaje.length - b.lenguaje.length);
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
        <div className='lenguaje'>
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
                  <h2>Modo Lenguaje</h2>
                  <p>En el modo Lenguaje intenta a que lenguaje de programación pertenece el trozo de código que se muestra.
                  </p>
                  <p><span className='verde'>Verde</span> Indica que es el lenguaje a encontrar.<br></br>
                    <span className='rojo'>Rojo</span> Indica que no hay coincidencia entre el lenguaje que ingresaste y el lenguaje a adivinar.
                  </p>
                  <h2>Pista</h2>
                  <p>Para ayudarte a encontrar el lenguaje, podrás desbloquear una pista tras varios intentos.</p>
                  <p>Si has adivinado el lenguaje, puedes regresar a la sección de pistas y ver la pista sobre el lenguaje a adivinar</p>
                </div>
              </div>
            )}
            
            <div className='clasicocard'>
                <h2  className='clasicotitulo'>A que lenguaje pertenece el código</h2>
                <div className='cabecera'>
                    <span className='icon'><i className='bx bx-minus'></i></span>
                    <span className='icon'><i className='bx bx-square-rounded'></i></span>
                    <span className='icon'><i className='bx bx-x'></i></span>
                </div>
                <div className='terminal'>
                    <pre className='codigotexto'>{lenguajeDelDia.codigo}</pre>
                </div>
                {(intentos >= 6 || hasWon) ? (
                <div className='pistadiv2'>
                    <i className='bx bx-bulb bx-tada' onClick={mostrarPista}></i>
                    <p className='pistatexto2'>Pista del logro</p>
                    {mostrarMensaje && (
                    <div className='bocadillopista'>
                        <p className='pistatexto3'>{lenguajeDelDia.pista}</p>
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
                <p className="wintext2">#{lenguajeDelDia.lenguaje}</p>
                <div className='datodiv'>
                    <p className='titulodato'>¿Sabías que...?</p>
                    <p className='textodato'>{lenguajeDelDia.dato}</p>
                </div>

                <p className="contador">Próximo lenguaje en</p>
                <CountdownClock/>

                <p className='nextmode'>Siguiente modo:</p>
                <div className='modo2'>
                    <div className='icono2'>
                        <i className='bx bx-image-alt'></i>
                    </div>
                    <Link to="/logro">
                        <div className='nombre2'>
                            <h1>Framework</h1>
                            <p>Adivina el Framework segín su logo</p>
                        </div>
                    </Link>
                </div>
                </div>
            </div>
            ) : (
            <div className='downcard'>
                <div className='clasicoinput'>
                <input className='personajebuscador' placeholder='Escribe el nombre de un lenguaje' value={busqueda} onChange={handleBusquedaChange}></input>
                </div>
                <div className='clasicoicono'>
                <button className='send' onClick={compararLenguajes}>
                    <i className='bx bx-send'></i>
                </button>
                </div>
            </div>
            )}

            <div className='listaresultados'>  
            {lenguajeNoEncontrado && (
                <div className='noresultado'>
                <p>No se ha encontrado ningun lenguaje</p>
                </div>
            )}
            </div>

            <div className='listaresultados'>
            {busqueda && resultadosBusqueda.length > 0 && (
                <ul>
                {resultadosBusqueda.map(lenguaje => (
                    <li onClick={() => autocompletarInput(lenguaje.lenguaje)}>{lenguaje.lenguaje}</li>
                ))}
                </ul>
            )}  
            </div>

            {lenguajeBuscado.length > 0 && (
            <div className="tabla">
                <table className='tablaresultados'>
                <thead>
                    <tr>
                    <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {lenguajeBuscado.map((buscado, index) => (
                    <tr className='intentostabla'>
                        <td className={buscado.coincidencias.lenguaje ? 'green_cell' : 'red_cell'}>{buscado.lenguaje.lenguaje}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}

            {hasWon ? (
                <div className='downcard'>
                <div className='sharecard'>
                    <p>He encontrado el lenguaje de #Programmingdle en {intentos} intentos</p>

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
                        <td>{user.lenguaje.length || ''}</td>
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

export default Lenguaje;