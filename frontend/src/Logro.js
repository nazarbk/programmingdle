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

        const indiceAleatorio = Math.floor(Math.random() * data.resultado.length);
        const personajeAleatorioInicial = data.resultado[indiceAleatorio];
        setpersonajeDelDia(personajeAleatorioInicial);
      })
      .catch(error => {
        console.error(error);
      });
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

      console.log('COINCIDENCIA: ', coincidencias);

      if(coincidencias.nombre === true){
        setHasWon(true);
      }
    } else {
      
    }
  };

  const actualizarIntento = async () => {
    setIntentos(intentos + 1);
  }

  const eliminarPersonaje = (nombre) => {
    const nuevosPersonajes = [...personajes];
  
    const nuevosPersonajesFiltrados = nuevosPersonajes.filter((personaje) => personaje.nombre !== nombre);
  
    setPersonajes(nuevosPersonajesFiltrados);
  };

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

  return personajeDelDia ? (
      <div className='logro'>
      <Header/>
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
                  <button className="shareButtonStyle"> <i className='bx bx-copy-alt'></i> Copiar</button>
                  <button className="shareButtonStyle"><i className='bx bxl-whatsapp'></i> Compartir</button>
                </div>
                
                <p id="copiadoMensaje" className="copiado-mensaje" style={{ display: 'none' }}>¡Texto copiado al portapapeles!  </p>
              </div>
            </div>
          ) : null
        }
    </div>
  ):null;
}

export default Logro;
