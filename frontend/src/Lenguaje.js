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
    const [cargarRanking, setcargarRanking] = useState(false);
    const [username, setUsername] = useState('');
    //username que se usa para almacenar el valor del input
    const [nombreusuario, setNombreusuario] = useState('');

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
            if(data.usuario.clasico !== null && data.usuario.clasico.length !== 0){
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
            } else {
              console.log('Usuario no encontrado:', data.mensaje);
            }
          })
          .catch(error => {
            console.error('Error al actualizar el usuario:', error);
          });
    
          setcargarRanking(true);
      };

    if(actualizarUser){
        actualizarUsuario();
    }
    if(actualizarPersonajes){
        eliminarLenguajes();
    }
    if(cargarRanking){

        fetch('https://programmingdle.onrender.com/Usuarios/ranklenguaje', {
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

    return lenguajeDelDia ? (
        <div className='lenguaje'>
            <Header/>
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
    ) : null
} 

export default Lenguaje;